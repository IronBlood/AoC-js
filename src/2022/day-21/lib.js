// @ts-check

/**
 * @typedef {import("./types").NumberYellingMonkey} NumberYellingMonkey
 * @typedef {import("./types").MathOperationMonkey} MathOperationMonkey
 * @typedef {import("./types").Monkey} Monkey
 */

/**
 * @param {number} a
 * @param {number} b
 */
const int_div = (a, b) => {
	const c = a / b;
	if (c !== Math.trunc(c)) {
		console.log(`[WARN] floating ${c} = ${a} / ${b}`);
	}
	return c;
};

/**
 * @param {Record<string, Monkey>} monkeys
 * @param {string} name
 * @returns {number}
 */
const resolve_monkey = (monkeys, name) => {
	const m = monkeys[name];
	if (!m) {
		throw new Error(`cannot find monkey ${name}`);
	}

	if (m.type === "number" || m.resolved) {
		return m.value;
	}

	m.resolved = true;
	const [op1, opcode, op2] = m.raw.split(" ");

	const fn = () => {
		const v1 = resolve_monkey(monkeys, op1);
		const v2 = resolve_monkey(monkeys, op2);

		switch (opcode) {
			case "+": return v1 + v2;
			case "-": return v1 - v2;
			case "*": return v1 * v2;
			case "/": return int_div(v1, v2);
		}

		throw new Error("unreachable");
	};

	return (m.value = fn());
};

/**
 * @param {string} data
 * @returns {Record<string, Monkey>}
 */
const parse_monkeys = (data) => {
	const monkeys = Object.create(null);

	data.split("\n").forEach(line => {
		const [name, v] = line.split(": ");

		if (/\d+/.test(v)) {
			/** @type {NumberYellingMonkey} */
			const nym = {
				type: "number",
				value: +v,
				has_humn: name === "humn" ? 1 : 0,
			};

			monkeys[name] = nym;
		} else {
			/** @type {MathOperationMonkey} */
			const mom = {
				type: "math",
				resolved: false,
				value: -1,
				raw: v,
				has_humn: -1,
			};

			monkeys[name] = mom;
		}
	});

	return monkeys;
};

/**
 * @param {string} data
 */
export const get_root = (data) => {
	const monkeys = parse_monkeys(data);
	return resolve_monkey(monkeys, "root");
};

/**
 * @readonly @enum {number}
 */
const HumnMark = {
	UNRESOLVED: -1,
	NO: 0,
	YES: 1,
};

/**
 * @param {Record<string, Monkey>} monkeys
 * @param {string} name
 * @returns {HumnMark}
 */
const dfs_mark_humn = (monkeys, name) => {
	if (name === "humn")
		return HumnMark.YES;

	const m = monkeys[name];
	if (!m) {
		throw new Error("never");
	}

	if (m.type === "number" || m.has_humn !== HumnMark.UNRESOLVED) {
		// pre-resolved
		return m.has_humn;
	}

	const [l, _, r] = m.raw.split(" ");
	const res_l = dfs_mark_humn(monkeys, l);
	const res_r = dfs_mark_humn(monkeys, r);

	if (res_l === HumnMark.UNRESOLVED || res_r === HumnMark.UNRESOLVED) {
		throw new Error("never");
	}

	// @ts-ignore safe
	return (m.has_humn = res_l | res_r);
};

/**
 * @param {Record<string, Monkey>} monkeys
 * @param {string} name
 * @param {number} value
 * @returns {void}
 */
const update_humn = (monkeys, name, value) => {
	const m = monkeys[name];
	if (!m) {
		throw new Error(`never`);
	}

	if (name === "humn") {
		m.value = value;
		return;
	}

	if (m.type !== "math") {
		throw new Error(`should only handle math node`);
	}

	const [op1, opcode, op2] = m.raw.split(" ");
	const m1 = monkeys[op1], m2 = monkeys[op2];
	const hh = [m1.has_humn, m2.has_humn];
	if (hh.some(x => x === HumnMark.UNRESOLVED)) {
		throw new Error(`UNRESOLVED???`);
	}
	if (hh.every(x => x === HumnMark.YES)) {
		throw new Error(`both contains humn`);
	}

	if (m1.has_humn) {
		const v2 = resolve_monkey(monkeys, op2);
		let v1;
		switch (opcode) {
			case "+": v1 = value - v2; break;
			case "-": v1 = value + v2; break;
			case "*": v1 = int_div(value, v2); break;
			case "/": v1 = value * v2; break;
			default: throw new Error("never");
		}
		update_humn(monkeys, op1, v1);
	} else {
		const v1 = resolve_monkey(monkeys, op1);
		let v2;
		switch (opcode) {
			case "+": v2 = value - v1; break;
			case "-": v2 = v1 - value; break;
			case "*": v2 = int_div(value, v1); break;
			case "/": v2 = int_div(v1, value); break;
			default: throw new Error("never");
		}
		update_humn(monkeys, op2, v2);
	}
};

/**
 * @param {string} data
 * @returns {number}
 */
export const get_humn = (data) => {
	const monkeys = parse_monkeys(data);
	dfs_mark_humn(monkeys, "root");

	const root = monkeys["root"];
	if (!root || root.type !== "math") {
		throw new Error("never");
	}

	let [src, _, tgt] = root.raw.split(" ");

	if (monkeys[src].has_humn === HumnMark.YES && monkeys[tgt].has_humn === HumnMark.YES) {
		throw new Error("never");
	}
	if (monkeys[src].has_humn) {
		// swap
		[src, tgt] = [tgt, src];
	}

	const target_value = resolve_monkey(monkeys, src);
	update_humn(monkeys, tgt, target_value);

	return monkeys["humn"].value;
};
