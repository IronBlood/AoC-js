/**
 * @param {number[][]grid}
 * @param {number} x
 * @param {number} y
 */
const is_in_grid = (grid, x, y) => x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

const directions = [0, 1, 0, -1, 0];

/**
 * @param {number[][]} grid
 */
const get_zeroes = (grid) => {
	/** @type {[number, number][]} */
	const zeroes = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] == 0) {
				zeroes.push([i, j]);
			}
		}
	}
	return zeroes;
};

/**
 * Count scores when part = 1 (by default), or ratings when part = 2
 * @param {number[][]} grid
 * @param {[number,number]} curr
 * @param {1|2} part
 */
const count = (grid, curr, part = 1) => {
	/** @type {number[][]} */
	let dp;
	if (part === 2) {
		dp = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(0));
		dp[curr[0]][curr[1]] = 1;
	}

	/** @type {Set<string>} */
	let queue = new Set();
	let height = 0;

	queue.add(curr.join(","));

	while (queue.size > 0) {
		height++;
		const next = new Set();
		if (height == 10) {
			return (part === 1) ? queue.size : [...queue].reduce((sum, pos) => {
				const [x,y] = pos.split(",").map(Number);
				return sum + dp[x][y];
			}, 0);
		}

		for (const pos of queue) {
			const [a,b] = pos.split(",").map(Number);
			for (let i = 0; i < 4; i++) {
				const x = a + directions[i], y = b + directions[i + 1];
				if (is_in_grid(grid, x, y) && grid[x][y] == height) {
					if (part === 2)
						dp[x][y] += dp[a][b];
					next.add(`${x},${y}`);
				}
			}
		}

		queue = next;
	}

	return 0;
};

/**
 * @param {string} data
 */
export const sum_scores = (data) => {
	const grid = data.split("\n").map(line => line.split("").map(Number));
	const zeros = get_zeroes(grid);
	return zeros.reduce((sum, curr) => sum + count(grid, curr), 0);
};

/**
 * @param {string} data
 */
export const sum_ratings = (data) => {
	const grid = data.split("\n").map(line => line.split("").map(Number));
	const zeros = get_zeroes(grid);
	return zeros.reduce((sum, curr) => sum + count(grid, curr, 2), 0);
};

