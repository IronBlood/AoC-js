// @ts-check
/**
 * @typedef {(line: string, idx: number) => [boolean, number]} find_digit_callback
 */

/**
 * @param {string} line
 * @param {number} start
 * @param {number} end
 * @param {number} delta
 * @param {find_digit_callback} cb
 */
const find_digit = (line, start, end, delta, cb) => {
	for (let i = start; i !== end; i += delta) {
		const [check, num] = cb(line, i);
		if (check)
			return num;
	}
	return 0;
};

/** @type {find_digit_callback} */
const find_digit_cb1 = (line, idx) => {
	if (/\d/.test(line[idx])) {
		return [true, +line[idx]];
	}
	return [false, 0];
};

/** @type {find_digit_callback} */
const find_digit_cb2 = (line, idx) => {
	/** @type {[string, number][]} */
	const substitutions = [
		["one", 1],
		["two", 2],
		["three", 3],
		["four", 4],
		["five", 5],
		["six", 6],
		["seven", 7],
		["eight", 8],
		["nine", 9],
	];
	if (/\d/.test(line[idx])) {
		return [true, +line[idx]];
	}
	for (const [s, n] of substitutions) {
		if (line.substring(idx, idx + s.length) === s) {
			return [true, n];
		}
	}
	return [false, 0];
};

/**
 * @param {string} data
 */
export const get_sum = (data, part = 1) => {
	const cb = part === 1 ? find_digit_cb1 : find_digit_cb2;
	return data.split("\n").reduce((sum, line) => sum +
		find_digit(line, 0, line.length, 1, cb) * 10 +
		find_digit(line, line.length - 1, -1, -1, cb)
	, 0);
};

