/**
 * @param {string[]} lines
 * @param {number} row_step
 * @param {number} col_step
 */
const loop = (lines, row_step, col_step) => {
	let sum = 0, j = 0, W = lines[0].length;
	for (let i = 0; i < lines.length; i += row_step) {
		sum += (lines[i][j] === "#" ? 1 : 0);
		j = (j + col_step) % W;
	}
	return sum;
};

/**
 * @param {string} data
 */
export const count_trees = (data) => {
	const lines = data.split("\n");
	return loop(lines, 1, 3);
};

/**
 * @param {string} data
 */
export const count_trees_2 = (data) => {
	const lines = data.split("\n");
	return [
		[ 1, 1 ],
		[ 1, 3 ],
		[ 1, 5 ],
		[ 1, 7 ],
		[ 2, 1 ],
	].reduce((res, [row_step, col_step]) => res * loop(lines, row_step, col_step), 1);
};

