/**
 * @param {string} str
 * @returns {number}
 */
export const largest1 = (str) => {
	const digits = str.split("").map(Number);
	let a = digits[0], b = digits[1];
	for (let i = 2; i < digits.length; i++) {
		const c = digits[i];
		if (a * 10 + b < b * 10 + c) {
			a = b;
			b = c;
			continue;
		}

		if (b < c) {
			b = c;
			continue;
		}
	}
	return a * 10 + b;
};

/**
 * @param {number[]} arr
 */
const arr_to_num = (arr) => arr.reduce((a, b) => a * 10 + b);

/**
 * @param {string} str
 * @param {number} len
 * @returns {number}
 */
export const largest2 = (str, len) => {
	const digits = str.split("").map(Number);
	let arr = digits.slice(0, len);
	let curr = arr_to_num(arr);
	for (let i = len; i < digits.length; i++) {
		const d = digits[i];
		/** @type {[number[], number][]} */
		const candidates = [];
		for (let j = 0; j < len; j++) {
			const next_arr = [
				...arr.slice(0, j),
				...arr.slice(j+1),
				d,
			];
			const next_val = arr_to_num(next_arr);
			candidates.push([next_arr, next_val]);
		}
		for (const [next_arr, next_val] of candidates) {
			if (next_val > curr) {
				curr = next_val
				arr = next_arr;
			}
		}
	}
	return curr;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const total_joltage = (data, part = 1) => {
	const len = part === 1 ? 2 : 12;
	return data.split("\n").reduce((s, c) => s + largest2(c, len), 0);
};
