/**
 * @param {Map<number, number[]>} map
 * @param {number} port
 * @param {number} id
 */
const add_id_to_map = (map, port, id) => {
	if (!map.has(port)) {
		map.set(port, []);
	}
	map.get(port).push(id);
};

/**
 * @param {string} data
 */
export const build_bridge = (data, part = 1) => {
	const components = data.split("\n").map((line, idx) => {
		const ports = line.split("/").map(Number);
		return { id: idx, ports };
	});

	/** @type {Map<number, number[]>} */
	const map = new Map();
	components.forEach(c => {
		add_id_to_map(map, c.ports[0], c.id);
		add_id_to_map(map, c.ports[1], c.id);
	});

	let max = 0, longest = 0;

	/** @type {(0|1)[]} */
	const visited = Array(components.length).fill(0);

	/**
	 * @param {number} curr_id
	 */
	const dfs = (curr_id, port) => {
		if (visited[curr_id]) {
			if (part === 1) {
				max = Math.max(max, components.filter(c => visited[c.id] === 1).reduce((sum, c) => sum + c.ports[0] + c.ports[1], 0));
			} else {
				const length = visited.reduce((s, c) => s + c, 0);
				const strength = components.filter(c => visited[c.id] === 1).reduce((sum, c) => sum + c.ports[0] + c.ports[1], 0);
				if (length > longest) {
					longest = length;
					max = strength;
				} else if (length === longest) {
					max = Math.max(max, strength);
				}
			}
			return;
		}

		visited[curr_id] = 1;
		for (let cid of map.get(port)) {
			const c = components[cid];
			dfs(cid, c.ports[0] !== port ? c.ports[0] : c.ports[1]);
		}
		visited[curr_id] = 0;
	};

	for (let bid of map.get(0)) {
		const b = components[bid];
		dfs(bid, b.ports[0] !== 0 ? b.ports[0] : b.ports[1]);
	}

	return max;
};

