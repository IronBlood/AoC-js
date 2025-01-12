/**
 * @param {[number, number][]} cfg
 * @param {number} part
 */
const get_token = (cfg, part) => {
	const [A, B, P] = cfg;
	if (part === 2) {
		P[0] += 10000000000000;
		P[1] += 10000000000000;
	}

	let delta_p = P[0] * B[1] - P[1] * B[0],
		delta_a = A[0] * B[1] - A[1] * B[0];
	if (delta_p % delta_a !== 0)
		return 0;

	const a = delta_p / delta_a;
	if ((P[0] - a * A[0]) % B[0] !== 0)
		return 0;
	const b = (P[0] - a * A[0]) / B[0];
	return a * 3 + b;
};

/**
 * @param {string} data
 */
export const minimum_token = (data, part = 1) => {
	return data.split("\n\n").reduce((sum, curr, idx) => {
		const cfg = curr.split("\n").map(line => {
			const m = line.match(/\d+/g);
			return [m[0], m[1]].map(Number);
		});
		return sum + get_token(cfg, part);
	}, 0);
};

