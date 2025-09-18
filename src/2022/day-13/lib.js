// @ts-check

/**
 * @readonly
 * @enum {number}
 */
export const CompareResult = {
	FALSE: 0,
	TRUE: 1,
	/** To be determined */
	TBD: 2,
}

/**
 * @param {number|number[]} a
 * @param {number|number[]} b
 * @throws
 * @returns {CompareResult}
 */
export const compare = (a, b) => {
	if (typeof a === "number" && typeof b === "number") {
		if (a < b) {
			return CompareResult.TRUE;
		} else if (a > b) {
			return CompareResult.FALSE;
		} else {
			return CompareResult.TBD;
		}
	} else if (typeof a === "number" && Array.isArray(b)) {
		return compare([a], b);
	} else if (Array.isArray(a) && typeof b === "number") {
		return compare(a, [b]);
	} else if (Array.isArray(a) && Array.isArray(b)) {
		// both a and b are arrays
		const min_len = Math.min(a.length, b.length);
		let i = 0;
		let larger = false;
		for (; i < min_len; i++) {
			const res = compare(a[i], b[i]);
			if (res === CompareResult.TBD)
				continue;
			return res;
		}

		if (a.length === b.length) {
			return CompareResult.TBD;
		} else if (a.length > b.length) {
			return CompareResult.FALSE;
		} else {
			return CompareResult.TRUE;
		}
	} else {
		throw new Error(`unsupported`);
	}
};

/**
 * @param {string} data
 */
export const sum_indices = (data) => {
	const groups = data.split("\n\n");

	let sum = 0;
	for (let i = 0; i < groups.length; i++) {
		const [a, b] = groups[i].split("\n").map(s => JSON.parse(s));
		if (compare(a, b) === CompareResult.TRUE) {
			sum += i + 1;
		}
	}

	return sum;
};

/**
 * @param {string} data
 */
export const decoder_key = (data) => {
	const signals = data
		.split("\n\n")
		.map(group => group.split("\n").map(s => JSON.parse(s)))
		.flat();

	const a = [[2]], b = [[6]];
	signals.push(a, b);
	signals.sort((x, y) => {
		const res = compare(x, y);
		switch (res) {
			case CompareResult.FALSE: return  1;
			case CompareResult.TRUE:  return -1;
			default:
				console.log(`equal ${a}, ${b}`);
				return 0;
		}
	});

	const idx_a = signals.findIndex(x => x === a);
	const idx_b = signals.findIndex(x => x === b);
	return (idx_a + 1) * (idx_b + 1);
};
