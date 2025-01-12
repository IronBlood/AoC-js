/**
 * @param {string} data
 * @returns {number}
 */
export const count_connected = (data) => {
	const adjs = data.split("\n").map(line => line.split(" <-> ")[1].split(", ").map(Number));
	/** @type {Set<number>} */
	const visited = new Set();
	let queue = [0];
	while (queue.length > 0) {
		const next_queue = [];
		queue.forEach(q => {
			if (!visited.has(q)) {
				visited.add(q);
				next_queue.push(...adjs[q]);
			}
		});
		queue = next_queue;
	}
	return visited.size;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_groups = (data) => {
	const adjs = data.split("\n").map(line => line.split(" <-> ")[1].split(", ").map(Number));
	/** @type {number[]} */
	const groups = Array(adjs.length).fill(-1);

	const dfs = (pid, gid) => {
		if (groups[pid] >= 0)
			return;
		groups[pid] = gid;
		adjs[pid].forEach(a => dfs(a, gid));
	};

	let gid = 0;
	for (let i = 0; i < groups.length; i++) {
		if (groups[i] >= 0)
			continue;
		dfs(i, gid++);
	}

	return gid;
};

