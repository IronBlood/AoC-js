/**
 * @param {Map<string, number>} nodes
 * @param {string[]} queue
 */
export const bfs_instructions = (nodes, queue) => {
	let is_valid = true;
	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];
		queue.forEach(line => {
			const [a, op, b, _, dst] = line.split(" ");
			if (dst === a || dst === b) {
				is_valid = false;
			}
			if (!nodes.has(a) || !nodes.has(b)) {
				next_queue.push(line);
				return;
			}

			const x = nodes.get(a), y = nodes.get(b);
			nodes.set(dst, op === "AND"
				? x & y
				: op === "OR"
				? x | y
				: x ^ y
			);
		});
		if (queue.length === next_queue.length) {
			is_valid = false;
		}
		if (!is_valid) {
			break;
		}
		queue = next_queue;
	}
	return is_valid;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const get_decimal = (data) => {
	const [inputs, instructions] = data.split("\n\n").map(str => str.split("\n"));

	/** @type {Map<string, number>} */
	const nodes = new Map();
	inputs.forEach(line => {
		const [a, b] = line.split(": ");
		nodes.set(a, +b);
	});

	bfs_instructions(nodes, instructions);
	return get_num(nodes, "z");
};

/**
 * @param {Map<string, number>} map
 * @param {string} char
 */
export const get_num = (map, char, return_string = false) => {
	const ans = [];
	for (let [key, val] of map.entries()) {
		if (key.startsWith(char)) {
			ans.push([Number(key.substring(char.length)), val]);
		}
	}
	ans.sort((a, b) => b[0] - a[0]);
	const str = ans.map(x => x[1]).join("");
	return return_string ? str : parseInt(str, 2);
};

const CMD_SP = " -> ";

/**
 * @param {number[]} indices
 */
function findAllPairs(indices) {
	/** @type {number[][]} */
	const results = [];

	/**
	 * @param {number[]} remaining,
	 * @param {number[]}
	 */
	function backtrack(remaining, pairs) {
		if (remaining.length === 0) {
			results.push([...pairs]);
			return;
		}

		const first = remaining[0];
		for (let i = 1; i < remaining.length; i++) {
			const second = remaining[i];
			const nextRemaining = remaining.filter((_, idx) => idx !== 0 && idx !== i);
			backtrack(nextRemaining, [...pairs, [first, second]]);
		}
	}

	backtrack(indices, []);
	return results;
}

/**
 * @param {string} data
 * @param {number} pairs
 * @returns {string}
 */
export const get_pairs = (data, pairs = 4) => {
	const [inputs, instructions] = data.split("\n\n").map(str => str.split("\n"));
	/** @type {Map<string, number>} */
	const nodes = new Map();
	inputs.forEach(line => {
		const [a, b] = line.split(": ");
		nodes.set(a, +b);
	});

	const target = get_num(nodes, "x") + get_num(nodes, "y");
	const parsed_instructions = instructions.map(line => line.split(CMD_SP));

	/** @type {string[]|null} */
	let ans = null;

	/** @type {number[]} */
	const indices = [];
	for (let i = 0; i < pairs * 2; i++) {
		indices.push(i);
	}
	const all_pairs = findAllPairs(indices);

	/**
	 * @param {number[]} ins_indices
	 */
	const evalulate = (ins_indices) => {
		for (let pairs of all_pairs) {
			const dup_instructions = parsed_instructions.map(x => x.slice());
			let buf = [];
			pairs.forEach(([u, v]) => {
				const a = dup_instructions[ins_indices[u]],
					b = dup_instructions[ins_indices[v]];
				const tmp = a[1];
				a[1] = b[1];
				b[1] = tmp;
				buf.push(a[1], b[1]);
			});
			const dup_nodes = new Map(nodes);
			const tmp = dup_instructions.map(x => x.join(CMD_SP));
			if (bfs_instructions(dup_nodes, tmp) && get_num(dup_nodes, "z") === target) {
				ans = buf;
				break;
			}
		}
	};

	/**
	 * @param {number[]} stack
	 * @param {number} curr_idx
	 */
	const backtracking = (stack, curr_idx) => {
		if (ans != null) return;
		if (stack.length === pairs * 2) {
			return evalulate([...stack]);
		}
		for (let i = curr_idx + 1; i < parsed_instructions.length; i++) {
			stack.push(i);
			backtracking(stack, i);
			stack.pop();
		}
	};

	backtracking([], -1);

	return ans ? ans.sort().join(",") : "";
};

/**
 * Generate the graph using the DOT language
 * @param {string} data
 */
export const gen_graph = (data) => {
	const [inputs, instructions] = data.split("\n\n").map(x => x.split("\n"));

	/** @type {Set<string>} */
	const set_nodes = new Set();
	/** @type {string[]} */
	const arr_gates = [];
	/** @type {string[]} */
	const conns = [];

	let gate_count = [0, 0, 0]; // AND, OR, XOR
	const gate_colors = [
		"#feb3a3", // and
		"#e0fea3", // or
		"#a3edfe", // xor
	];

	instructions.forEach(line => {
		const [a, op, b, _, dst] = line.split(" ");
		[a, b, dst].forEach(x => set_nodes.add(x));
		const idx = op === "AND" ? 0 : op === "OR" ? 1 : 2;
		const gate_name = `${op}_${gate_count[idx]++}`;
		arr_gates.push(`${gate_name} [shape=rect, fillcolor="${gate_colors[idx]}", style="filled"]`);
		conns.push(`${a} -> ${gate_name}; ${b} -> ${gate_name}; ${gate_name} -> ${dst};`);
	});

	const final_buf = [
		`digraph G {`,
	];
	for (let node of set_nodes.values()) {
		const h = node[0];
		if (h === "x" || h === "y")
			final_buf.push(`${node} [shape=circle, fillcolor="#76f961", style="filled"];`);
		else if (h === "z")
			final_buf.push(`${node} [shape=circle, fillcolor="#617df9", style="filled"];`);
		else
			final_buf.push(`${node} [shape=circle];`);
	}
	for (let gate of arr_gates) {
		final_buf.push(gate);
	}
	for (let conn of conns) {
		final_buf.push(conn);
	}
	final_buf.push("}");

	return final_buf.join("\n");
};

