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

/**
 * @param {number} serial_number
 * @returns {string}
 */
export const largest_total_power_pos = (serial_number) => {
	const size = 301;
	/** @type {number[][]} */
	const grid = Array.from({ length: size }, () => Array(size));

	for (let i = 1; i < size; i++) {
		for (let j = 1; j < size; j++) {
			grid[i][j] = get_power_level(i, j, serial_number);
		}
	}

	let max = -1, /** @type {number[]} */ pos = null;

	for (let i = 1; i < size - 2; i++) {
		for (let j = 1; j < size - 2; j++) {
			let sum = 0;
			for (let u = i; u < i + 3; u++) {
				for (let v = j; v < j + 3; v++) {
					sum += grid[u][v];
				}
			}
			if (sum > max) {
				max = sum;
				pos = [i, j];
			}
		}
	}

	return pos.join(",");
};

/**
 * @param {number} serial_number
 * @returns {string}
 */
export const largest_total_power = (serial_number) => {
	const size = 301;
	/** @type {number[][]} */
	const grid = Array.from({ length: size }, () => Array(size));

	for (let i = 1; i < size; i++) {
		for (let j = 1; j < size; j++) {
			grid[i][j] = get_power_level(i, j, serial_number);
		}
	}

	let max = -1, /** @type {number[]} */ pos = null;

	for (let k = 1; k < size; k++) {
		for (let i = 1; i < size - k + 1; i++) {
			for (let j = 1; j < size - k + 1; j++) {
				let sum = 0;
				for (let u = i; u < i + k; u++) {
					for (let v = j; v < j + k; v++) {
						sum += grid[u][v];
					}
				}
				if (sum > max) {
					max = sum;
					pos = [i, j, k];
				}
			}
		}
	}

	return pos.join(",");
}

