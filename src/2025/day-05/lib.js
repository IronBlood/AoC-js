/**
 * @param {string} data
 */
const build_range = (data) => {
	const ranges = data.split("\n").map(line => line.split("-").map(Number));
	ranges.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

	/** @type {number[][]} */
	const res = [];
	for (const r of ranges) {
		if (res.length === 0 || r[0] > res[res.length - 1][1] + 1) {
			res.push(r);
		} else {
			const x = res[res.length - 1][1];
			res[res.length - 1][1] = Math.max(x, r[1]);
		}
	}
	return res;
};

/**
 * @param {string} data
 */
export const count_fresh = (data, part = 1) => {
	const segs = data.split("\n\n");

	const ranges = build_range(segs[0]);

	if (part === 1) {
		let count = 0;
		for (const id of segs[1].split("\n").map(Number)) {
			for (let r of ranges) {
				if (id >= r[0] && id <= r[1]) {
					count++;
					break;
				}
			}
		}
		return count;
	} else {
		return ranges.reduce((s, r) => s + r[1] - r[0] + 1, 0);
	}
};
