const neighbors = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
];

/**
 * @param {string} data
 */
export const get_lowest_points = (data) => {
	const grid = data.split("\n").map(line => line.split("").map(Number));
	const H = grid.length, W = grid[0].length;

	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	const lowest_points = [];
	for (let x = 0; x < H; x++) {
		for (let y = 0; y < W; y++) {
			let is_lowest = true;
			for (const [dx, dy] of neighbors) {
				const nx = x + dx, ny = y + dy;
				if (!in_grid(nx, ny)) {
					continue;
				}
				if (grid[x][y] >= grid[nx][ny]) {
					is_lowest = false;
					break;
				}
			}
			if (is_lowest) {
				lowest_points.push(grid[x][y]);
			}
		}
	}

	return lowest_points.reduce((a, b) => a + b) + lowest_points.length;
}

/**
 * @param {string} data
 */
export const get_basins = (data) => {
	const grid = data.split("\n").map(line => line.split("").map(Number));
	const H = grid.length, W = grid[0].length;

	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	const basins = [];

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	const bfs = (x, y) => {
		let queue = [[x, y]];
		let area = 0;

		while (queue.length > 0) {
			const next_queue = [];
			for (const [x, y] of queue) {
				if (!in_grid(x, y) || grid[x][y] === 9)
					continue;

				area++;
				grid[x][y] = 9;

				for (const [dx, dy] of neighbors) {
					next_queue.push([
						x + dx,
						y + dy,
					]);
				}
			}
			queue = next_queue;
		}
		return area;
	};

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] !== 9) {
				basins.push(bfs(i, j));
			}
		}
	}

	basins.sort((a, b) => b - a);
	basins.length = 3;
	return basins.reduce((a, b) => a * b);
};
