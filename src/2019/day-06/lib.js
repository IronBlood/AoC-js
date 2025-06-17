/**
 * @typedef {Object} Node
 * @property {number} id
 * @property {string} name
 * @property {Node?} parent
 * @property {Node[]} children
 */

/**
 * @param {string} data
 */
const build_nodes = (data) => {
	let id = 0;
	/** @type {Map<string, Node>} */
	const map = new Map();
	/** @type {Node[]} */
	const nodes = [];

	const lines = data.split("\n");
	lines.forEach(line => {
		const names = line.split(")");

		/** @type {Node[]} */
		const [node_a, node_b] = names.map(name => {
			if (map.has(name))
				return map.get(name);

			/** @type {Node} */
			const node = {
				parent: null,
				id,
				name,
				children: [],
			};
			map.set(name, node);
			nodes[id++] = node;
			return node;
		});

		if (!node_a || !node_b) {
			console.log(line);
		}
		node_b.parent = node_a;
		node_a.children.push(node_b);
	});

	return nodes;
};

/**
 * @param {string} data
 */
export const total_orbits = data => {
	const nodes = build_nodes(data);
	let roots = nodes.filter(node => node.parent === null);
	let orbits = Array(nodes.length).fill(0);

	/**
	 * @param {Node} node
	 */
	let dfs = (node, level = 0) => {
		if (!node)
			return;
		orbits[node.id] = level;
		node.children.forEach(x => dfs(x, level + 1));
	};

	roots.forEach(r => dfs(r));
	return orbits.reduce((s, c) => s + c, 0);
};

/**
 * @param {string} data
 */
export const min_transfer = data => {
	const nodes = build_nodes(data);
	const node_y = nodes.find(n => n.name === "YOU");
	const node_s = nodes.find(n => n.name === "SAN");

	/** @type {Map<string, number>} */
	const parents = new Map();
	let node = node_y;
	let dist = 0;
	while ((node = node.parent)) {
		parents.set(node.name, dist++);
	}

	node = node_s;
	dist = 0;
	while ((node = node.parent)) {
		if (parents.has(node.name))
			return dist + parents.get(node.name);
		dist++;
	}
};
