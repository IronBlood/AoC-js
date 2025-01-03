/**
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 * @param {number} rows
 * @param {number} cols
 */
const count_neighbors = (grid, x, y, rows, cols) => {
	let count = 0;
	const dirs = [
		[-1,-1], [-1,0], [-1,1],
		[0,-1], [0,1],
		[1,-1], [1,0], [1,1],
	];
	for (let [dx, dy] of dirs) {
		const a = x + dx, b = y + dy;
		if (a >= 0 && b >= 0 && a < rows && b < cols && grid[a][b] === "#")
			count++;
	}
	return count;
};

/**
 * @param {string[][]} grid
 */
const iterate = (grid, part = 1) => {
	const rows = grid.length, cols = grid[0].length;
	/** @type {string[][]} */
	const next = Array.from({ length: rows }, () => Array(cols));
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const n = count_neighbors(grid, i, j, rows, cols);
			if (grid[i][j] === "#") {
				next[i][j] = (n === 2 || n === 3) ? "#" : ".";
			} else {
				next[i][j] = (n === 3) ? "#" : ".";
			}
		}
	}
	if (part === 2) {
		next[0][0] = next[0][cols-1] = next[rows-1][0] = next[rows-1][cols-1] = "#";
	}
	return next;
};

/**
 * @param {string[][]} grid
 */
const count = grid => grid.reduce((sum, row) => sum + row.reduce((s, c) => s + (c === "#" ? 1 : 0), 0), 0);

/**
 * @param {string} data
 * @param {number} steps
 * @returns {number}
 */
export const count_lights = (data, steps, part = 1) => {
	let grid = data.split("\n").map(line => line.split(""));
	for (let i = 0; i < steps; i++) {
		grid = iterate(grid, part);
	}
	return count(grid);
};

