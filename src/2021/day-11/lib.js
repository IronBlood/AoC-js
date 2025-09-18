/** @type {() => Set<string>[]} */
const init_map = () => Array.from({ length: 10 }, () => new Set());

/**
 * @param {number} x
 * @param {number} y
 */
const get_neighbors = (x, y) => {
	const neighbors = [];
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			if (dx === 0 && dy === 0)
				continue;

			neighbors.push([
				x + dx,
				y + dy,
			]);
		}
	}
	return neighbors;
}

/**
 * @param {string} data
 */
export const count_flashes = (data, part = 1) => {
	let steps = part === 1 ? 100 : Number.MAX_SAFE_INTEGER;
	let grid = data.split("\n").map(line => line.split("").map(Number));
	const H = grid.length, W = grid[0].length;

	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	let map = init_map();
	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			const v = grid[i][j];
			map[v].add(`${i},${j}`);
		}
	}

	let flashed = 0;

	while (steps-- > 0) {
		/** @type {typeof map} */
		const next_map = Array(10);

		// update
		for (let i = 0; i < 9; i++) {
			next_map[i+1] = map[i];
		}
		for (let i = 0; i < H; i++) {
			for (let j = 0; j < W; j++) {
				grid[i][j] = Math.min(10, grid[i][j] + 1);
			}
		}

		/** @type {Set<string>} */
		const local_flashed = new Set();
		let queue = Array.from(map[9]);

		// use BFS to handle flashes
		while (queue.length > 0) {
			/** @type {typeof queue} */
			const next_queue = [];
			for (const pos of queue) {
				if (local_flashed.has(pos)) {
					continue;
				}

				local_flashed.add(pos);

				const [x, y] = pos.split(",").map(Number);
				for (const [nx, ny] of get_neighbors(x, y)) {
					if (!in_grid(nx, ny))
						continue;

					const ori_val = grid[nx][ny];
					if (ori_val === 10) {
						continue;
					}

					// update value of a neighbor, both in grid and set
					const key = `${nx},${ny}`;
					const nxt_val = ori_val + 1;
					next_map[ori_val].delete(key);
					if (nxt_val === 10) {
						next_queue.push(key);
					} else {
						next_map[nxt_val].add(key);
					}
					grid[nx][ny] = nxt_val;
				}
			}

			queue = next_queue;
		}

		next_map[0] = local_flashed;
		flashed += local_flashed.size;

		if (part === 2 && local_flashed.size === H * W) {
			return Number.MAX_SAFE_INTEGER - steps;
		}

		// update grid
		for (const pos of local_flashed) {
			const [x, y] = pos.split(",").map(Number);
			grid[x][y] = 0;
		}

		map = next_map;
	}

	return flashed;
};
