/**
 * @param {number} x
 */
export const calc = x => Math.floor(x / 3) - 2;

/**
 * @param {string} data
 */
export const total_fuel = (data) => {
	return data.split("\n").reduce((sum, line) => sum + calc(+line), 0);
};

/**
 * @param {number} x
 */
export const calc_2 = x => {
	let sum = 0;
	let dep = 0;

	while ((dep = calc(x)) > 0) {
		sum += dep;
		x = dep;
	}
	return sum;
};

/**
 * @param {string} data
 */
export const total_fuel2 = (data) => {
	return data.split("\n").reduce((sum, line) => sum + calc_2(+line), 0);
};
