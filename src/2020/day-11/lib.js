/**
 * @param {string} data
 */
export const gridfy = (data) => data.split("\n").map(line => line.split(""));

/**
 * @param {string[][]} grid
 */
export const stringify = grid => grid.map(row => row.join("")).join("\n");

/**
 * @param {string[][]} grid
 * @param {string} data
 */
export const mutate = (grid, data, part = 1) => {
	const H = grid.length, W = grid[0].length;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const count_adj1 = (x, y) => {
		let sum = 0;

		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				if (i === x && j === y)
					continue;
				if (!in_grid(i, j))
					continue;

				sum += grid[i][j] === "#" ? 1 : 0;
			}
		}

		return sum;
	};

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const count_adj2 = (x, y) => {
		let sum = 0;

		const vectors = [
			[-1, -1], [-1, 0], [-1, 1],
			[0, -1], [0, 1],
			[1, -1], [1, 0], [1, 1],
		];

		for (const v of vectors) {
			let k = 1;
			while (true) {
				const i = x + k * v[0],
					j = y + k * v[1];

				if (!in_grid(i, j))
					break;

				if (grid[i][j] === ".") {
					k++;
					continue;
				}

				sum += grid[i][j] === "#" ? 1 : 0;
				break;
			}
		}

		return sum;
	};

	const count_adj = part === 1 ? count_adj1 : count_adj2;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const should_taken = (x, y) => count_adj(x, y) === 0;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const should_empty = (x, y) => count_adj(x, y) >= (part === 1 ? 4 : 5);

	const next = gridfy(data);

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			if (grid[i][j] === ".")
				continue;

			if (grid[i][j] === "L") {
				next[i][j] = should_taken(i, j) ? "#" : "L";
			} else {
				next[i][j] = should_empty(i, j) ? "L" : "#";
			}
		}
	}

	return next;
};

/**
 * @param {string} data
 */
export const count_seats = (data, part = 1) => {
	let grid = gridfy(data);
	let prev = data;

	while (true) {
		grid = mutate(grid, data, part);
		const curr = stringify(grid);
		if (curr === prev)
			break;

		prev = curr;
	}

	return grid.reduce((sum, row) => sum + row.reduce((s, c) => s + (c === "#" ? 1 : 0), 0), 0);
};
