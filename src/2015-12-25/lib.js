/**
 * @param {number} code
 */
export const get_next_code = code => (code * 252533) % 33554393;

/**
 * @param {number} x
 * @param {number} y
 */
export const get_num_by_xy = (x,y) => {
	const starting = (x + y - 1) * (x + y - 2) / 2 + 1;
	return starting + y - 1;
};

/**
 * @param {number} row
 * @param {number} col
 */
export const get_code = (row, col) => {
	let count = get_num_by_xy(row, col);
	let code = 20151125;
	while (--count > 0) code = get_next_code(code);
	return code;
};

