/**
 * @param {string[][]} grid
 * @param {string} letter
 * @param {string} [replace]
 * @returns {[number, number]}
 */
const get_pos = (grid, letter, replace = ".") => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === letter) {
				grid[i][j] = replace;
				return [i, j];
			}
		}
	}
};

/**
 * @param {string} data
 * @param {number} cheat_time
 * @param {number} offset
 */
export const count_cheats_by_saving = (data, cheat_time, offset) => {
	const grid = data.split("\n").map(line => line.split(""));
	const pos_s = get_pos(grid, "S");
	const pos_e = get_pos(grid, "E");
	const dirs = [0, 1, 0, -1, 0];

	// pass 1 - bfs
	let queue = [pos_s];
	/** @type {number[][]} */
	const costs = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(Number.MAX_SAFE_INTEGER));
	/** @type {number[][]} */
	const visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(0));

	let steps = 0;
	while (queue.length > 0) {
		const next_queue = [];
		let found = false;
		for (let i = 0; i < queue.length; i++) {
			const [x, y] = queue[i];
			if (grid[x][y] === "#" || visited[x][y] === 1) {
				continue;
			}
			visited[x][y] = 1;
			costs[x][y] = Math.min(costs[x][y], steps);
			for (let j = 0; j < 4; j++) {
				next_queue.push([
					x + dirs[j],
					y + dirs[j + 1],
				]);
			}
		}
		steps++;
		queue = next_queue;
	}

	/** @type {Set<string>} */
	const cheats = new Set();
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === "#")
				continue;

			const cost1 = costs[i][j];
			for (let u = i - cheat_time; u <= i + cheat_time; u++) {
				if (u < 0 || u >= grid.length)
					continue;
				for (let v = j - cheat_time; v <= j + cheat_time; v++) {
					if (v < 0 || v >= grid[0].length || grid[u][v] === "#")
						continue;
					const cheat = Math.abs(u-i) + Math.abs(v-j);
					const cost2 = costs[u][v];
					if (cheat <= cheat_time && cost2 >= (cost1 + cheat + offset)) {
						cheats.add([i,j,u,v].join(","));
					}
				}
			}
		}
	}

	return cheats.size;
};

