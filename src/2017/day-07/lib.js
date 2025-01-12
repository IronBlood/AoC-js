/**
 * @param {string} data
 * @returns {string}
 */
export const get_root = (data) => {
	const non_roots = new Set();
	const candidates = new Set();
	data.split("\n").forEach(line => {
		if (line.indexOf(" -> ") === -1) {
			const node = line.split(" ")[0];
			non_roots.add(node);
		} else {
			const arr = line.split(" -> ");
			const parent = arr[0].split(" ")[0];
			const children = arr[1].split(", ");

			if (!non_roots.has(parent))
				candidates.add(parent);
			children.forEach(c => {
				non_roots.add(c);
				candidates.delete(c);
			});
		}
	});

	if (candidates.size != 1) {
		console.log(candidates);
	}

	return [...candidates][0];
};

/**
 * @typedef {Object} Tower
 * @property {string} name
 * @property {number} weight
 * @property {Tower|null} parent
 * @property {Tower[]} children
 * @property {number} sum
 */

/**
 * @param {string} data
 * @return {string}
 */
export const find_wrong_weight = (data) => {
	const regex_node = /(\w+) \((\d+)\)/;
	const lines = data.split("\n");
	/** @type {Map<string, number>} */
	const name_to_idx = new Map();

	/** @type {Tower[]} */
	const nodes = lines.map((line, idx) => {
		const match = line.match(regex_node);
		name_to_idx.set(match[1], idx);
		return {
			name: match[1],
			weight: +match[2],
			parent: null,
			children: [],
			sum: 0,
		};
	});

	lines.forEach(line => {
		const arr = line.split(" -> ");
		if (arr.length === 2) {
			const parent_name = arr[0].split(" ")[0];
			/** @type {Tower} */
			const parent_node = nodes[name_to_idx.get(parent_name)];
			/** @type {Tower[]} */
			const children_nodes = arr[1].split(", ").map(n => nodes[name_to_idx.get(n)]);
			children_nodes.forEach(c => c.parent = parent_node);
			parent_node.children = children_nodes;
		}
	});

	let root = nodes.filter(x => x.parent === null)[0];

	/** @type {Tower} */
	let wrong_node;

	/**
	 * @param {Tower} node
	 * @returns {number}
	 */
	const dfs = (node) => {
		if (node === null)
			return 0;
		if (node.children.length === 0) {
			node.sum = node.weight;
			return node.weight;
		}

		node.sum = node.children.reduce((sum, x) => sum + dfs(x), node.weight);

		/** @type {Map<number, number>} */
		const map = new Map();
		node.children.forEach(x => map.set(x.sum, (map.get(x.sum) || 0) + 1));
		if (map.size > 1 && wrong_node == null) {
			for (let i = 0; i < node.children.length; i++) {
				const x = node.children[i];
				if (map.get(x.sum) === 1) {
					wrong_node = x;
					break;
				}
			}
		}
		return node.sum;
	};
	dfs(root);

	const p = wrong_node.parent;
	let correct = 0;
	for (let i = 0; i < p.children.length; i++) {
		if (p.children[i].sum != wrong_node.sum) {
			correct = p.children[i].sum;
			break;
		}
	}

	return correct - wrong_node.sum + wrong_node.weight;
};

