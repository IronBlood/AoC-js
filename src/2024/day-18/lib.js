/**
 * @param {string} data
 * @param {number} bytes
 * @param {[number, number]} range
 * @returns {number}
 */
export const min_steps = (data, bytes, range) => {
	/**
	 * @type {number[][]}
	 */
	const grid = Array.from({ length: range[0] + 1 }, () => Array(range[1] + 1).fill(0));
	const dp = Array.from({ length: range[0] + 1 }, () => Array(range[1] + 1).fill(Number.MAX_SAFE_INTEGER));
	dp[0][0] = 0;
	const queue = [[0,0]];
	const dirs = [0, 1, 0, -1, 0];

	const lines = data.split("\n");
	for (let i = 0; i < bytes; i++) {
		const [x,y] = lines[i].split(",").map(Number);
		grid[x][y] = 1;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const is_in_grid = (x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

	while (queue.length > 0) {
		/** @type {[number, number]} */
		const [x,y] = queue.shift();
		for (let i = 0; i < 4; i++) {
			const nx = x + dirs[i], ny = y + dirs[i + 1];
			if (is_in_grid(nx, ny) && grid[nx][ny] != 1) {
				if (dp[nx][ny] > dp[x][y] + 1) {
					dp[nx][ny] = dp[x][y] + 1;
					queue.push([nx, ny]);
				}
			}
		}
	}

	return dp[range[0]][range[1]];
};

/**
 * @param {[number,number][]} candidates
 * @param {(0|1)[][]} grid
 */
const reachable = (candidates, grid) => {
	/** @type {Set<string>} */
	const set = new Set();

	const dirs = [0, -1, 0, 1, 0];

	/**
	 * @param {[number,number]} pos
	 * @param {Set<string>} visited
	 */
	const bfs = (pos, visited) => {
		let queue = [pos];
		while (queue.length > 0) {
			const next_queue = [];

			for (pos of queue) {
				const [x,y] = pos;
				if (x === grid.length - 1 && y === grid[0].length - 1) {
					return true;
				}

				if (x < 0 || x === grid.length || y < 0 || y === grid[0].length || grid[x][y] === 1) {
					continue;
				}

				const str = pos.join(",");
				if (visited.has(str)) {
					continue;
				}

				visited.add(str);
				for (let i = 0; i < 4; i++) {
					const nx = x + dirs[i], ny = y + dirs[i + 1];
					next_queue.push([nx, ny]);
				}
			}

			queue = next_queue;
		}
		return false;
	};

	candidates.forEach(c => {
		if (bfs(c, new Set())) {
			set.add(c.join(","));
		}
	});
	return [...set].map(x => x.split(",").map(Number));
};

/**
 * @param {string} data
 * @param {[number, number]} range
 * @returns {number}
 */
export const first_block = (data, range) => {
	const lines = data.split("\n");
	const grid = Array.from({ length: range[0] + 1 }, () => Array(range[1] + 1).fill(0));
	const dirs = [0, 1, 0, -1, 0];
	let possible_locations = [[0, 0]];

	for (let i = 0; i < lines.length; i++) {
		const [x,y] = lines[i].split(",").map(Number);
		grid[x][y] = 1;
		possible_locations = reachable(possible_locations, grid);
		if (possible_locations.length == 0) {
			return lines[i];
		}
	}
};

