// @ts-check

export const symbol_accepted = Symbol();
export const symbol_rejected = Symbol();

/**
 * @typedef {{x: number; m: number; a: number; s: number;}} XmasPart
 * @typedef {(part: XmasPart) => string|boolean|typeof symbol_accepted|typeof symbol_rejected} XmasChecker
 */

/**
 * @param {string[]} lines
 */
const build_workflow = (lines) => {
	/** @type {Record<string, XmasChecker>} */
	const workflows = {};

	lines.forEach(line => {
		const len = line.length, idx_l = line.indexOf("{");
		const name = line.substring(0, idx_l);
		const rules = line.substring(idx_l + 1, len - 1).split(",");
		const parsed_rules = rules.map(rule => {
			// accepted or rejected
			if (rule === "A")
				return symbol_accepted;
			if (rule === "R")
				return symbol_rejected;

			const idx_colon = rule.indexOf(":");
			// switch to other rules
			if (idx_colon < 0) {
				return rule;
			}

			const op_char = rule[0];
			const op_code = rule[1];
			const op_num  = +rule.substring(2, idx_colon);
			const res = rule.substring(idx_colon + 1);

			/** @type {XmasChecker} */
			const fn = (part) => {
				/** @type {undefined|number} */
				const val = part[op_char];
				if (val === undefined) {
					throw new Error(`cannot find ${op_char} from ${line}`);
				}

				const checked_res = op_code === "<"
					? (val < op_num)
					: (val > op_num);

				if (!checked_res)
					return false;

				if (res === "A")
					return symbol_accepted;
				if (res === "R")
					return symbol_rejected;
				return res;
			};

			return fn;
		});

		workflows[name] = (part) => {
			for (const pr of parsed_rules) {
				if (typeof pr !== "function") {
					return pr;
				} else {
					const res = pr(part);
					if (!res)
						continue;
					return res;
				}
			}
			throw new Error(`failed to execute part ${JSON.stringify(part)} with ${line}`);
		};
	});

	return workflows;
};

/**
 * @param {string} data
 */
export const sum_rating = (data) => {
	const [
		workflow_lines,
		part_lines,
	] = data.split("\n\n").map(x => x.split("\n"));

	const workflows = build_workflow(workflow_lines);

	let sum = 0;
	part_lines.forEach(line => {
		const xmas_part = {};
		// @ts-ignore
		line.match(/[xmas]=\d+/g).forEach(x => {
			const [key, val] = x.split("=");
			xmas_part[key] = +val;
		});

		/** @type {string|boolean|typeof symbol_accepted|typeof symbol_rejected} */
		let res = "in";
		while (true) {
			if (typeof res !== "string") {
				throw new Error(`wrong res type`);
			}
			const fn = workflows[res];
			if (typeof fn !== "function") {
				throw new Error(`wrong res type`);
			}
			res = fn(xmas_part);

			if (res === symbol_accepted || res === symbol_rejected) {
				break;
			}
		}

		if (res === symbol_accepted) {
			for (const val of Object.values(xmas_part)) {
				sum += val;
			}
		}
	});
	return sum;
};

/**
 * @typedef {import("./types").ParsedRule} ParsedRule
 * @typedef {import("./types").DirectRule} DirectRule
 * @typedef {import("./types").Condition} Condition
 * @typedef {import("./types").ReversedRule} ReversedRule
 * @typedef {import("./types").WorkflowNode} WorkflowNode
 */

/**
 * @param {ParsedRule} rule
 * @returns {ReversedRule}
 */
const reverse_rule = (rule) => {
	if (!rule.opcode || !rule.oprand || !rule.op_num)
		throw new Error(`unexpected rule ${JSON.stringify(rule)}`);

	return {
		oprand: rule.oprand,
		opcode: rule.opcode === "<" ? ">=" : "<=",
		op_num: rule.op_num,
	};
};

/**
 * @param {ParsedRule | DirectRule} rule
 * @returns {Condition[]}
 */
const build_condition = (rule) => {
	const {
		prerequisites,
		// @ts-ignore
		op_num,
		// @ts-ignore
		opcode,
		// @ts-ignore
		oprand,
	} = rule;
	return (!op_num || !opcode || !oprand)
		? [...prerequisites]
		: [
			...prerequisites,
			{
				oprand,
				opcode,
				op_num,
			},
		];
};

/**
 * @param {string[]} lines
 */
const build_workflow2 = (lines) => {
	/** @type {Record<string, WorkflowNode>} */
	const workflows = {};

	lines.forEach(line => {
		const len = line.length, idx_l = line.indexOf("{");
		const name = line.substring(0, idx_l);
		const rules = line.substring(idx_l + 1, len - 1).split(",");
		/** @type {(ParsedRule|DirectRule)[]} */
		const parsed_rules = rules.map(rule => {
			/** @type {ReversedRule[]} */
			const prerequisites = [];
			// accepted or rejected
			if (rule === "A")
				return { prerequisites, result: "A" };
			if (rule === "R")
				return { prerequisites, result: "R" };

			const idx_colon = rule.indexOf(":");
			// switch to other rules
			if (idx_colon < 0) {
				return { prerequisites, result: rule };
			}

			const oprand = rule[0];
			const opcode = rule[1];
			const op_num = +rule.substring(2, idx_colon);
			const res = rule.substring(idx_colon + 1);

			return {
				prerequisites,
				oprand,
				opcode,
				op_num,
				result: res,
			};
		});

		for (let i = 1; i < parsed_rules.length; i++) {
			const curr = parsed_rules[i];
			const prev = parsed_rules[i - 1];
			curr.prerequisites = prev.prerequisites.slice();
			// @ts-ignore
			curr.prerequisites.push(reverse_rule(prev));
		}

		workflows[name] = {
			name,
			children: parsed_rules,
		};
	});

	return workflows;
};

/**
 * @param {WorkflowNode[]} arr
 */
const dump_workflow_nodes = (arr) => {
	const str = arr.map(node => node.name).join(" -> ");
	console.log(str);
};

/**
 * @param {Condition[]} conditions
 * @returns {number}
 */
export const count_condition_x = (conditions) => {
	let min = 1, max = 4000;
	for (const c of conditions) {
		switch (c.opcode) {
			case "<": max = Math.min(max, c.op_num - 1); break;
			case ">": min = Math.max(min, c.op_num + 1); break;
			case "<=": max = Math.min(max, c.op_num); break;
			case ">=": min = Math.max(min, c.op_num); break;
		}
	}

	return Math.max(0, max - min + 1);
};

/**
 * @param {Condition[][]} conditions
 * @returns {number}
 */
export const sum_conditions = (conditions) => {
	let total = 1;
	const flatted = conditions.flat();
	for (const x of ["x", "m", "a", "s"]) {
		const filtered = flatted.filter(c => c.oprand === x);
		total *= count_condition_x(filtered);
		if (total === 0)
			break;
	}
	// console.log(total, flatted);
	return total;
};

/**
 * @param {string} data
 */
export const all_combinations = (data) => {
	const workflows = build_workflow2(data.split("\n\n")[0].split("\n"));
	let total = 0;
	/**
	 * @param {string} node
	 * @param {WorkflowNode[]} stack_node
	 * @param {Condition[][]} stack_conditions
	 */
	const dfs = (node, stack_node, stack_conditions) => {
		if (node === "A") {
			// dump_workflow_nodes(stack_node);
			total += sum_conditions(stack_conditions);
			return;
		}

		if (node === "R") {
			return;
		}

		const x = workflows[node];
		if (!x) {
			throw new Error(`No workflow for ${node}`);
		}

		stack_node.push(x);
		for (const child of x.children) {
			stack_conditions.push(build_condition(child));
			dfs(child.result, stack_node, stack_conditions);
			stack_conditions.pop();
		}
		stack_node.pop();
	}

	dfs("in", [], []);
	return total;
};
