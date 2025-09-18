/**
 * @param {string} data
 */
const parse_ranges = (data) => {
	const reg = /-?\d+..-?\d+/g;
	const matches = [];
	let m;
	while (m = reg.exec(data)) {
		matches.push(m[0]);
	}

	return matches.map(str => str.split("..").map(Number));
}

/**
 * @param {number} x;
 */
const sum = (x) => x * (x + 1) / 2;

/**
 * Figure out how high the probe can go before it falls back into the target.
 * The launch splits its journey into two phases: climbing up, then falling down.
 * On the way down, the probe passes back through the starting point
 * with the same speed it began with - only reversed.
 * To just reach the bottom edge of the target on that first descent step,
 * it must leave the ground with exactly the right initial speed.
 * That exact speed produces the highest peak before it comes back down.
 * @param {string} data
 */
export const get_highest_y_pos = (data) => {
	const [,[y_min]] = parse_ranges(data);
	return sum(y_min);
};

/**
 * @param {string} data
 */
export const count_pairs = (data) => {
	const [
		[x_min, x_max],
		[y_min, y_max],
	] = parse_ranges(data);

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const in_range = (x, y) => x >= x_min && x <= x_max && y >= y_min && y <= y_max;

	/**
	 * @param {number} vx
	 * @param {number} vy
	 */
	const sim = (vx, vy) => {
		const p = [0, 0];
		let inside = false;

		while (true) {
			p[0] += vx;
			p[1] += vy;

			vx = Math.max(0, vx - 1);
			vy--;

			if (in_range(p[0], p[1])) {
				inside = true;
				break;
			}

			if (p[0] > x_max || p[1] < y_min) {
				break;
			}
		}

		return inside;
	};

	let count = 0;
	for (let i = 0; i <= x_max; i++) {
		for (let j = y_min; j <= 10 * x_max; j++) {
			if (sim(i, j)) {
				count++;
			}
		}
	}
	return count;
};
