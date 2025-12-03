/**
 * @param {string} str
 */
export const sum_invalids_by_range1 = (str) => {
	const [str_lo, str_hi] = str.split("-");

	// HACK
	if ((str_lo.length * str_hi.length) & 1) {
		return 0;
	}

	let num_lo = +str_lo;
	let num_hi = +str_hi;

	let sum = 0;

	if (str_lo.length === str_hi.length) {
		// both even
		const half = str_lo.length / 2;
		let start = +str_lo.substring(0, half);
		const shift = 10 ** half + 1;
		while (true) {
			const t = start * shift;
			start++;
			if (t < num_lo)
				continue;
			if (t > num_hi)
				break;
			sum += t;
		}
	} else {
		if (str_lo.length & 1) {
			num_lo = Number("1" + "0".repeat(str_hi.length - 1));
			const half = str_hi.length / 2;
			let start = +str_hi.substring(0, half);
			const shift = 10 ** half + 1;
			while (true) {
				const t = start * shift;
				start--;
				if (t > num_hi)
					continue;
				if (t < num_lo)
					break;
				sum += t;
			}
		} else {
			num_hi = Number("9".repeat(str_lo.length));
			const half = str_lo.length / 2;
			let start = +str_lo.substring(0, half);
			const shift = 10 ** half + 1;
			while (true) {
				const t = start * shift;
				start++;
				if (t < num_lo)
					continue;
				if (t > num_hi)
					break;
				sum += t;
			}
		}
	}

	return sum;
};

/**
 * @param {string} str
 * @returns {number}
 */
export const sum_invalids_by_range2 = (str) => {
	const [str_lo, str_hi] = str.split("-");
	let num_lo = +str_lo;
	let num_hi = +str_hi;

	/** @type {Set<number>} */
	const invalids = new Set();

	for (let seg = 2; seg <= Math.max(str_lo.length, str_hi.length); seg++) {
		if (str_lo.length % seg === 0) {
			const hi = Math.min(
				num_hi,
				+"9".repeat(str_lo.length)
			);
			const seg_len = str_lo.length / seg;
			let start = +str_lo.substring(0, seg_len);
			while (true) {
				const t = +String(start++).repeat(seg);
				if (t < num_lo)
					continue;
				if (t > hi)
					break;
				invalids.add(t);
			}
		}

		if (str_hi.length % seg === 0) {
			const lo = Math.max(
				num_lo,
				Number("1" + "0".repeat(str_hi.length - 1)),
			);
			const seg_len = str_hi.length / seg;
			let start = +str_hi.substring(0, seg_len);
			while (true) {
				const t = +String(start--).repeat(seg);
				if (t < lo)
					break;
				if (t > num_hi)
					continue;
				invalids.add(t);
			}
		}
	}

	let sum = 0;
	for (const x of invalids) {
		sum += x;
	}
	return sum;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const sum_invalid_ids = (data, part = 1) => {
	const fn = part === 1 ? sum_invalids_by_range1 : sum_invalids_by_range2;
	return data.split(",").reduce((sum, str) => sum + fn(str), 0);
};
