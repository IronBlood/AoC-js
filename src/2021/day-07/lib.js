/**
 * @param {string} data
 */
export const min_fuel = (data) => {
	const positions = data.split(",").map(Number);

	positions.sort((a, b) => a - b);

	const mi = positions[positions.length >> 1];

	return positions.reduce((s, x) => s + Math.abs(x - mi), 0);
};

/**
 * @param {string} data
 */
export const min_fuel2 = (data) => {
	const positions = data.split(",").map(Number);
	const raw_mean = positions.reduce((a, b) => a + b) / positions.length;

	const p1 = Math.floor(raw_mean), p2 = Math.ceil(raw_mean);

	/**
	 * @param {number} d
	 */
	const get_fuel = (d) => {
		d = Math.abs(d);
		return d * (d + 1) / 2;
	};

	const candidates = [p1, p2].map(p => positions.reduce((s, x) => s + get_fuel(x - p), 0));

	return Math.min(...candidates);
}
