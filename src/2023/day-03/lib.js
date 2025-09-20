// @ts-check

const is_digit = x => /\d/.test(x);

/**
 * @param {string} line
 * @param {number} start_idx
 */
const find_num_end = (line, start_idx) => {
	let j = start_idx;
	while (j < line.length && is_digit(line[j])) {
		j++;
	}
	return j;
};

/**
 * @param {string[]} lines
 * @param {number} row
 * @param {number} left  included
 * @param {number} right excluded
 * @returns {boolean}
 */
const check_symbol = (lines, row, left, right) => {
	if (row < 0 || row >= lines.length)
		return false;

	for (let i = Math.max(left, 0); i < Math.min(right, lines[row].length); i++) {
		if (!/[\.0-9]/.test(lines[row][i])) {
			return true;
		}
	}
	return false;
};

/**
 * @param {string} line
 * @param {number} left  included
 * @param {number} right excluded
 * @returns {boolean}
 */
const check_symbol_curr_row = (line, left, right) => {
	const chars = [];
	if (left >= 0) {
		chars.push(line[left]);
	}
	if (right < line.length) {
		chars.push(line[right]);
	}
	return chars.some(x => !/[\.0-9]/.test(x));
};

/**
 * @param {string} data
 */
export const sum = data => {
	const lines = data.split("\n");

	let res = 0;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		for (let j = 0; j < line.length;) {
			if (!/\d/.test(line[j])) {
				j++;
				continue;
			}

			const k = find_num_end(line, j);
			if (check_symbol(lines, i - 1, j - 1, k + 1) || check_symbol(lines, i + 1, j - 1, k + 1) || check_symbol_curr_row(line, j - 1, k)) {
				const num = +line.substring(j, k);
				res += num;
			}
			j = k + 1;
		}
	}

	return res;
};

/**
 * @param {string[]} lines
 * @param {number} x
 * @param {number} y
 * @returns {number[]}
 */
const find_gear_nums = (lines, x, y) => {
	/** @type {number[]} */
	const nums = [];

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const extract_bidirection = (x, y) => {
		let l = y, r = y;
		while (l >= 0 && is_digit(lines[x][l])) {
			l--;
		}
		while (r < lines[x].length && is_digit(lines[x][r])) {
			r++;
		}
		nums.push(+lines[x].substring(l + 1, r));
	};

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const extract_left = (x, y) => {
		let l = y;
		while (l >= 0 && is_digit(lines[x][l])) {
			l--;
		}
		nums.push(+lines[x].substring(l + 1, y + 1));
	};

	const extract_right = (x, y) => {
		let r = y;
		while (r < lines[x].length && is_digit(lines[x][r])) {
			r++;
		}
		nums.push(+lines[x].substring(y, r));
	}

	for (const dx of [-1, 0, 1]) {
		const nx = x + dx;
		if (nx < 0 || nx >= lines.length)
			continue;

		if (is_digit(lines[nx][y])) {
			extract_bidirection(nx, y);
		} else {
			if (y - 1 >= 0 && is_digit(lines[nx][y - 1])) {
				extract_left(nx, y - 1);
			}
			if (y + 1 < lines[nx].length && is_digit(lines[nx][y + 1])) {
				extract_right(nx, y + 1);
			}
		}
	}

	return nums;
};

/**
 * @param {string} data
 */
export const gear_ratios = data => {
	const lines = data.split("\n");

	/** @type {[number, number][]} */
	const gear_pos = [];
	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[0].length; j++) {
			if (lines[i][j] === "*") {
				gear_pos.push([i, j]);
			}
		}
	}

	let res = 0;
	for (const [x, y] of gear_pos) {
		const nums = find_gear_nums(lines, x, y);
		if (nums.length == 2) {
			res += nums[0] * nums[1];
		}
	}
	return res;
};
