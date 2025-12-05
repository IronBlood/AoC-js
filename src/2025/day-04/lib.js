/**
 * @param {string[][]} grid
 */
const count_rolls_per_tick = (grid) => {
	const M = grid.length, N = grid[0].length;
	const next_grid = grid.map(row => row.slice());

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < M && y < N;

	/**
	 * @param {number} i
	 * @param {number} j
	 */
	const accessable = (i, j) => {
		let count = 0;
		for (let x = i - 1; x <= i + 1; x++) {
			for (let y = j - 1; y <= j + 1; y++) {
				if (!in_grid(x, y) || (x === i && y === j)) {
					continue;
				}
				if (grid[x][y] === "@") {
					count++;
				}
			}
		}
		return count < 4;
	};

	let count = 0;
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			const c = grid[i][j];
			if (c === ".")
				continue;

			if (accessable(i, j)) {
				count++;
				next_grid[i][j] = ".";
			}
		}
	}

	return {
		count,
		next_grid,
	};
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_rolls = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	return count_rolls_per_tick(grid).count;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const count_rolls_all = (data) => {
	let grid = data.split("\n").map(line => line.split(""));
	let sum = 0;

	while (true) {
		const res = count_rolls_per_tick(grid);
		if (res.count === 0) {
			break;
		}

		grid = res.next_grid;
		sum += res.count;
	}

	return sum;
};
