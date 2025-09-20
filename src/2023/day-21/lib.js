// @ts-check

const dirs = [0, 1, 0, -1, 0];

/**
 * @param {string[][]} grid
 */
const find_start = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === "S") {
				return [i, j];
			}
		}
	}
	throw new Error("no starting point");
};

/**
 * @param {string} data
 * @param {number} max_steps
 * @returns {number}
 */
export const count_tiles = (data, max_steps, part = 1) => {
	const grid = data.split("\n").map(line => line.split(""));
	let [x, y] = find_start(grid);
	grid[x][y] = ".";
	const remain = max_steps % 2;
	/** @type {Set<string>} */
	const visited = new Set();
	let tiles = 0;
	let queue = [{
		x,
		y,
		mapped_x: x,
		mapped_y: y,
		steps: 0,
	}];

	const H = grid.length, W = grid[0].length;
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const {x, y, mapped_x, mapped_y, steps} of queue) {
			const key = `${x},${y}`;
			if (visited.has(key)) {
				continue;
			}
			visited.add(key);
			const local_remain = steps % 2;
			if (local_remain === remain) {
				tiles++;
			}

			const next_steps = steps + 1;
			if (next_steps <= max_steps) {
				for (let i = 0; i < 4; i++) {
					const nx = x + dirs[i];
					const ny = y + dirs[i + 1];

					const nmx = (mapped_x + dirs[i] + H) % H;
					const nmy = (mapped_y + dirs[i + 1] + W) % W;
					if (part === 1) {
						if (!in_grid(nx, ny) || grid[nx][ny] === "#") {
							continue;
						}
					} else {
						if (grid[nmx][nmy] === "#") {
							continue;
						}
					}
					next_queue.push({
						x: nx,
						y: ny,
						mapped_x: nmx,
						mapped_y: nmy,
						steps: next_steps,
					});
				}
			}
		}

		queue = next_queue;
	}

	// console.log(visited);
	return tiles;
};

/**
 * @param {string} data
 * @param {number} max_steps
 */
export const count_tiles2 = (data, max_steps) => {
	const grid = data.split("\n").map(line => line.split(""));
	let [x, y] = find_start(grid);
	grid[x][y] = ".";
	const H = grid.length, W = grid[0].length;
	const in_grid = (x, y) => x >= 0 && x < H && y >= 0 && y < W;

	// 202300
	const n = (max_steps - y) / W;

	/** @type {number[][]} */
	const visited = Array.from({ length: H }, () => Array(W).fill(Infinity));

	let queue = [[x, y]];
	let step = 0;
	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];
		for (const [x, y] of queue) {
			if (step >= visited[x][y]) {
				continue;
			}
			visited[x][y] = step;

			for (let i = 0; i < 4; i++) {
				const nx = x + dirs[i];
				const ny = y + dirs[i + 1];

				if (in_grid(nx, ny) && grid[nx][ny] !== "#") {
					next_queue.push([nx, ny]);
				}
			}
		}
		step++;
		queue = next_queue;
	}

	// credit https://github.com/villuna/aoc23/wiki/A-Geometric-solution-to-advent-of-code-2023,-day-21
	const flatted = visited.flat().filter(x => Number.isFinite(x));
	const even_corners = flatted.filter(x => x % 2 === 0 && x > 65).length;
	const odd_corners = flatted.filter(x => x % 2 === 1 && x > 65).length;
	const odd_full = flatted.filter(x => x % 2 === 1).length;
	const even_full = flatted.filter(x => x % 2 === 0).length;

	const odd = (n + 1) * (n + 1);
	const even = n * n;

	return odd * odd_full + even * even_full - (n + 1) * odd_corners + n * even_corners;
};
