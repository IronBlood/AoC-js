/**
 * @param {number[][]} cfgs
 */
const _get_severity = (cfgs, delays = 0) => {
	return cfgs.reduce((sum, [id, depth]) => {
		if ((id + delays) % ((depth - 1) * 2) === 0) {
			return sum + id * depth;
		} else {
			return sum;
		}
	}, 0);
};

/**
 * @param {string} data
 * @returns {number}
 */
export const get_severity = (data) => {
	return _get_severity(data.split("\n").map(line => line.split(": ").map(Number)));
};

export const get_delays = (data) => {
	const cfgs = data.split("\n").map(line => line.split(": ").map(Number));
	let delays = 0;
	while ((delays % ((cfgs[0][1] - 1) * 2) === 0) || _get_severity(cfgs, delays) !== 0) {
		delays++;
	}
	return delays;
};

