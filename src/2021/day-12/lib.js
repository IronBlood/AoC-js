/** BIG CAVES */
const re_BC = /[A-Z]+/;
/** small caves */
const re_sc = /[a-z]+/;

/**
 * @param {string} data
 */
export const count_paths = (data, part = 1) => {
	/** @type {Set<number>} */
	const small_caves = new Set();
	/** @type {Set<number>} */
	const big_caves = new Set();

	/** @type {Map<string, number>} */
	const map_name_to_id = new Map();
	/** @type {Map<number, string>} */
	const map_id_to_name = new Map();

	const links = data.split("\n").map(line => line.split("-"));

	// build name-id
	let id = 0;
	links.flat().forEach(x => {
		if (map_name_to_id.has(x))
			return;

		map_name_to_id.set(x, id);
		map_id_to_name.set(id, x);

		if (re_BC.test(x)) {
			big_caves.add(id);
		} else {
			small_caves.add(id);
		}

		id++;
	});

	// build adjs
	/** @type {number[][]} */
	const adjs = Array.from({ length: id }, () => []);
	links.forEach(pairs => {
		const [a, b] = pairs.map(x => map_name_to_id.get(x));
		adjs[a].push(b);
		adjs[b].push(a);
	});

	const id_start = map_name_to_id.get("start");
	const id_end = map_name_to_id.get("end");

	let count = 0;
	/** @type {number[]} */
	const visited = Array(id).fill(0);

	/**
	 * @param {number} id
	 */
	const dfs1 = (id) => {
		if (visited[id])
			return;

		if (id === id_end) {
			count++;
			return;
		}

		if (small_caves.has(id)) {
			visited[id] = 1;
		}
		for (const neighbor of adjs[id]) {
			dfs1(neighbor);
		}
		visited[id] = 0;
	};

	/**
	 * @param {number} id
	 */
	const dfs2 = (id) => {
		if (id === id_end) {
			count++;
			return;
		}

		if (visited[id] === 2) {
			return
		}

		if (visited[id] === 1) {
			// cannot revisit start
			if (id === id_start)
				return;
			// whether a small cave has been visited twice
			for (const v of visited) {
				if (v === 2)
					return;
			}
			visited[id] = 2;
		} else if (small_caves.has(id)) {
			// a small cave hasn't been visited
			visited[id] = 1;
		}

		for (const neighbor of adjs[id]) {
			dfs2(neighbor);
		}

		if (visited[id]) {
			visited[id]--;
		}
	};

	if (part === 1) {
		dfs1(id_start);
	} else {
		dfs2(id_start);
	}

	return count;
};
