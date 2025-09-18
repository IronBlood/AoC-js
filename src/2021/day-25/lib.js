// @ts-check

/**
 * @param {string[][]} grid
 * @returns {string[][]}
 */
const move = (grid) => {
	const H = grid.length, W = grid[0].length;
	/** @type {string[][]} */
	const next = Array.from({ length: H }, () => Array(W).fill("."));

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			const c = grid[i][j];
			if (c !== ">") {
				continue;
			}

			const nj = (j + 1) % W;
			if (grid[i][nj] === ".") {
				next[i][nj] = c;
			} else {
				next[i][j] = c;
			}
		}
	}

	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			const c = grid[i][j];
			if (c !== "v") {
				continue;
			}

			const ni = (i + 1) % H;
			if ([".", ">"].includes(grid[ni][j]) && next[ni][j] === ".") {
				next[ni][j] = c;
			} else {
				next[i][j] = c;
			}
		}
	}

	return next;
};

/**
 * @param {string[][]} grid
 * @returns {string}
 */
const stringify = (grid) => grid.map(row => row.join("")).join("\n");

/**
 * @param {string[][]} a
 * @param {string[][]} b
 * @return {boolean}
 */
const is_same_grid = (a, b) => {
	return stringify(a) === stringify(b);
};

/**
 * @param {string} data
 */
export const no_move = (data) => {
	let grid = data.split("\n").map(line => line.split(""));

	let step = 0;

	while (true) {
		const next = move(grid);
		step++;

		if (is_same_grid(grid, next)) {
			break;
		}
		grid = next;
	}

	return step;
};
