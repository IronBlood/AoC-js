/**
 * @param {number[][]} grid
 * @param {[number, number]} s
 * @param {[number, number]} e
 * @returns {number}
 */
export const bfs = (grid, s, e) => {
	const H = grid.length, W = grid[0].length;
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	let queue = [s];

	const step_grid = grid.map(row => row.slice().fill(Number.MAX_SAFE_INTEGER));
	let steps = 0;
	const DIRS = [0, 1, 0, -1, 0];

	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const [x, y] of queue) {
			if (x === e[0] && y === e[1])
				return steps;

			if (step_grid[x][y] <= steps) {
				continue;
			}
			step_grid[x][y] = steps;

			for (let i = 0; i < 4; i++) {
				const nx = x + DIRS[i];
				const ny = y + DIRS[i + 1];

				if (!in_grid(nx, ny) || step_grid[nx][ny] <= steps)
					continue;

				if (grid[nx][ny] <= grid[x][y] + 1) {
					next_queue.push([nx, ny]);
				}
			}
		}

		queue = next_queue;
		steps++;
	}

	return Number.MAX_SAFE_INTEGER;
};

/**
 * @param {string} data
 */
export const fewest_steps = (data, part = 1) => {
	let s, e;
	const grid = data.split("\n").map((line, row) => {
		return Array.from({ length: line.length }, (_,col) => {
			const char = line[col];
			switch (char) {
				case "S": s = [row, col]; return 0;
				case "E": e = [row, col]; return 25;
				default: return char.charCodeAt(0) - 97;
			}
		});
	});

	if (part === 1) {
		return bfs(grid, s, e);
	} else {
		const candidates = [];
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[0].length; j++) {
				if (grid[i][j] === 0) {
					candidates.push([i, j]);
				}
			}
		}

		let min = Number.MAX_SAFE_INTEGER;
		candidates.forEach(c => min = Math.min(min, bfs(grid, c, e)));
		return min;
	}
};
