/**
 * @param {number} s
 * @param {number} q
 * @param {number} r
 */
const get_dist = (s,q,r) => (Math.abs(s) + Math.abs(q) + Math.abs(r)) / 2;

/**
 * https://www.redblobgames.com/grids/hexagons/
 * @param {string} data
 * @returns {number}
 */
export const count_steps = (data, part = 1) => {
	let q = 0, r = 0, s = 0;
	let max = 0;
	let dist = 0;
	data.split(",").forEach(d => {
		switch (d) {
			case "n": r--; break;
			case "s": r++; break;
			case "ne": q++; r--; break;
			case "sw": q--; r++; break;
			case "se": q++; break;
			case "nw": q--; break;
		}
		s = 0 - q - r;

		dist = get_dist(s, q, r);
		max = Math.max(max, dist);
	});

	return part === 1 ? dist : max;
};

