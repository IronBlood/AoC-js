// @ts-check
/**
 * @param {number} x
 * @param {number} y
 * @param {number} serial_number
 */
export const get_power_level = (x, y, serial_number) => {
	const id = x + 10;
	const start = id * y;
	let num = id * (start + serial_number);

	num = num < 100 ? 0 : (((num / 100) | 0) % 10);

	return num - 5;
};

const build_sat = serial_number => {
	const n = 300;
	const sat = Array.from({ length: n + 1 }, () => new Int32Array(n + 1));
	for (let i = 1; i <= n; i++) {
		let row_sum = 0;
		for (let j = 1; j <= n; j++) {
			row_sum += get_power_level(i, j, serial_number);
			sat[i][j] = sat[i - 1][j] + row_sum;
		}
	}
	return sat;
};

/**
 * @param {Int32Array[]} sat
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
const rect_sum = (sat, x1, y1, x2, y2) => sat[x2][y2] - sat[x1 - 1][y2] - sat[x2][y1 - 1] + sat[x1 - 1][y1 - 1];

/**
 * @param {number} serial_number
 * @returns {string}
 */
export const largest_total_power_pos = (serial_number) => {
	const size = 301;
	const sat = build_sat(serial_number);
	let best = -Infinity, bx = 0, by = 0;

	for (let i = 1; i < size - 2; i++) {
		for (let j = 1; j < size - 2; j++) {
			const s = rect_sum(sat, i, j, i + 2, j + 2);
			if (s > best) {
				best = s;
				bx = i;
				by = j;
			}
		}
	}

	return [bx, by].join(",");
};

/**
 * @param {number} serial_number
 * @returns {string}
 */
export const largest_total_power = (serial_number) => {
	const size = 301;
	const sat = build_sat(serial_number);
	let best = -Infinity, bx = 0, by = 0, bk = 0;

	for (let k = 1; k < size; k++) {
		const limit = size - k;
		for (let i = 1; i <= limit; i++) {
			const x2 = i + k - 1;
			for (let j = 1; j <= limit; j++) {
				const y2 = j + k - 1;
				const s = rect_sum(sat, i, j, x2, y2);
				if (s > best) {
					best = s;
					bx = i;
					by = j;
					bk = k;
				}
			}
		}
	}

	return [bx, by, bk].join(",");
}

