/**
 * @param {string} str
 * @param {string} char
 */
const parse_num = (str, char) => {
	let num = 0;
	for (let i = 0; i < str.length; i++) {
		num <<= 1;
		num |= (str[i] === char ? 1 : 0);
	}
	return num;
};

export const parse_row_num = (str) => parse_num(str, "B");
export const parse_col_num = (str) => parse_num(str, "R");

/**
 * @param {string} data
 */
export const get_highest_id = (data) => {
	let max = 0;
	data.split("\n").forEach(line => {
		const row = parse_row_num(line.substring(0, 7)),
			col = parse_col_num(line.substring(7));
		max = Math.max(max, (row << 3) | col);
	});
	return max;
};

/**
 * @param {string} data
 */
export const missing_ids = (data) => {
	/** @type {Set<number>} */
	let ids = new Set();
	let max = 0;
	let missing = [];

	data.split("\n").forEach(line => {
		const row = parse_row_num(line.substring(0, 7)),
			col = parse_col_num(line.substring(7));
		const num = (row << 3) | col;
		max = Math.max(max, num);
		ids.add(num);
	});

	for (let i = 0; i < max; i++) {
		if (!ids.has(i)) {
			missing.push(i);
		}
	}

	return missing;
};
