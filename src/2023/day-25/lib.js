// Credit: https://github.com/JoanaBLate/advent-of-code-js/blob/main/2023/day25/solve1.js
// @ts-check

/**
 * @typedef {import("./types").Node25} Node25
 */

/**
 * @param {string} data
 * @returns {number}
 */
export const get_multiple = (data) => {
	/** @type {Map<string, number>} */
	const node_name_to_id = new Map();
	/** @type {string[]} */
	const node_id_to_name = [];

	let id = 0;

	/**
	 * @param {string} name
	 */
	const check_id = (name) => {
		if (!node_name_to_id.has(name)) {
			node_name_to_id.set(name, id);
			node_id_to_name.push(name);
			id++;
		}
	};

	const plain_nodes = data.split("\n").map(line => {
		const [name, rest] = line.split(": ");
		const children = rest.split(" ");

		check_id(name);
		children.forEach(x => check_id(x));

		return { name, children };
	});

	/** @type {Node25[]} */
	const nodes = Array.from({ length: id }, () => ({
		children: [],
		used: false,
		visited: false,
	}));
	const reset_use = () => nodes.forEach(x => x.used = false);
	const reset_visit = () => nodes.forEach(x => x.visited = false);
	/**
	 * @param {Node25[]} path
	 */
	const update_path = (path) => path.forEach(x => x.used = true);
	plain_nodes.forEach(parent => {
		const p_id = node_name_to_id.get(parent.name);
		if (p_id === undefined) {
			throw new Error("never");
		}

		const p_node = nodes[p_id];
		parent.children.forEach(child => {
			const c_id = node_name_to_id.get(child);
			if (c_id === undefined) {
				throw new Error("never");
			}

			const c_node = nodes[c_id];

			if (p_node.children.indexOf(c_node) < 0) {
				p_node.children.push(c_node);
			}
			if (c_node.children.indexOf(p_node) < 0) {
				c_node.children.push(p_node);
			}
		});
	});

	let count_1 = 1, count_2 = 0;

	/**
	 * @param {Node25} target
	 * @param {Node25} current
	 */
	const search = (target, current) => {
		reset_use();
		current.used = true;

		let connections = 0;

		for (const child of current.children) {
			if (connections > 3)
				break;

			if (child === target) {
				connections++;
				continue;
			}

			const path = search2(target, child);
			if (path !== null) {
				connections++;
				update_path(path);
			}
		}

		if (connections > 3) {
			count_1++;
		} else {
			count_2++;
		}
	};

	/**
	 * @param {Node25} target
	 * @param {Node25} root
	 * @returns {Node25[]|null}
	 */
	const search2 = (target, root) => {
		reset_visit();
		root.visited = true;

		const paths = [[root]];
		while (true) {
			const path = paths.shift();
			if (path === undefined)
				break;

			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
			// Node 16.6+, Deno 1.12+, Chrome 92+, Firefox 90+
			const last_in_path = path.at(-1);

			for (const child of last_in_path.children) {
				if (target === child)
					return path;
				if (child.visited || child.used)
					continue;

				child.visited = true
				const new_path = path.slice();
				new_path.push(child);
				paths.push(new_path);
			}
		}

		return null;
	};

	for (let i = 1; i < nodes.length; i++) {
		search(nodes[i], nodes[0]);
	}
	return count_1 * count_2;
};
