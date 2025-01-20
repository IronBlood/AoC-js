/**
 * @param {string} data
 */
export const overlapping_area = (data, part = 1) => {
	const cfgs = data.split("\n").map(line => {
		const matches = line.match(/\d+/g);
		return [...matches].map(Number);
	});

	const size = 1000;
	/** @type {number[][]} */
	const freq = Array.from({ length: size }, () => Array(size).fill(0));
	cfgs.forEach(([_, l, t, w, h]) => {
		for (let i = t; i < t + h; i++) {
			for (let j = l; j < l + w; j++) {
				if (i >= size || j >= size) {
					throw new Error("out of range");
				}

				freq[i][j]++;
			}
		}
	});

	if (part === 1) {
		let count = 0;
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				if (freq[i][j] > 1) {
					count++;
				}
			}
		}
		return count;
	} else {
		for (let [id, l, t, w, h] of cfgs) {
			let found = true;
			for (let i = t; i < t + h; i++) {
				for (let j = l; j < l + w; j++) {
					if (freq[i][j] !== 1) {
						found = false;
						break;
					}
				}
				if (!found) {
					break;
				}
			}
			if (found) {
				return id;
			}
		}
	}
};

