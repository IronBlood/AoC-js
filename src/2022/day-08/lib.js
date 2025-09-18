/**
 * @param {string} data
 * @returns {number}
 */
export const count_visible_trees = (data) => {
	const grid = data.split("\n").map(line => line.split("").map(Number));
	const H = grid.length, W = grid[0].length;

	// initialize
	const visible = grid.map(row => row.slice().fill(0));
	for (let i = 0; i < W; i++) {
		visible[0][i] = 1;
		visible[H - 1][i] = 1;
	}
	for (let i = 0; i < H; i++) {
		visible[i][0] = 1;
		visible[i][W - 1] = 1;
	}

	// row scan
	for (let i = 1; i < H - 1; i++) {
		// left to right
		let max = grid[i][0];
		for (let j = 1; j < W - 1; j++) {
			if (grid[i][j] > max) {
				visible[i][j] = 1;
				max = grid[i][j];
			}
		}
		max = grid[i][W - 1];
		// right to left
		for (let j = W - 2; j >= 1; j--) {
			if (grid[i][j] > max) {
				visible[i][j] = 1;
				max = grid[i][j];
			}
		}
	}

	// col scan
	for (let j = 1; j < W - 1; j++) {
		// top to down
		let max = grid[0][j];
		for (let i = 1; i < H - 1; i++) {
			if (grid[i][j] > max) {
				visible[i][j] = 1;
				max = grid[i][j];
			}
		}
		max = grid[H - 1][j];
		for (let i = H - 2; i >= 1; i--) {
			if (grid[i][j] > max) {
				visible[i][j] = 1;
				max = grid[i][j];
			}
		}
	}

	return visible.flat().filter(x => x === 1).length;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const highest_scenic_score = (data) => {
	const grid = data.split("\n").map(line => line.split("").map(Number));
	const H = grid.length, W = grid[0].length;

	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const get_score = (x, y) => {
		const max = grid[x][y];
		return [
			[0, -1],
			[0, 1],
			[-1, 0],
			[1, 0],
		].map(direction => {
			const [dx, dy] = direction;
			let nx = x + dx, ny = y + dy;
			let count = 0;
			while (in_grid(nx, ny)) {
				count++;
				if (grid[nx][ny] >= max) {
					break;
				}
				nx += dx;
				ny += dy;
			}
			return count;
		}).reduce((a, b) => a * b);
	};

	let max = 0;
	for (let i = 1; i < H - 1; i++) {
		for (let j = 1; j < W - 1; j++) {
			let score = get_score(i, j);
			if (score > max) {
				max = score;
			}
		}
	}
	return max;
};
