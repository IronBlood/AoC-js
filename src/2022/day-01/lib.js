/**
 * @param {string} block
 */
const count_block = (block) => block.split("\n").map(Number).reduce((a, b) => a + b);

/**
 * @param {string} data
 */
export const find_most = (data) => {
	let max = 0;
	for (const block of data.split("\n\n")) {
		max = Math.max(max, count_block(block));
	}
	return max;
};

/**
 * @param {string} data
 */
export const sum_top_three = (data) => {
	return data
		.split("\n\n")
		.map(count_block)
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((a, b) => a + b);
};
