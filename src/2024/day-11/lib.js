/**
 * @param {string} str
 * @returns {string[]}
 */
const transform_naive = str => {
	if (str === "0") {
		return ["1"];
	}
	if ((str.length & 1) === 0) {
		const len = str.length / 2;
		return [str.substring(0, len), str.substring(len)].map(Number).map(String);
	}
	return [String(2024 * (+str))];
};

/**
 * @param {string} data
 * @param {number} blink
 * @returns {string[]}
 */
export const stones_after_blinks_naive = (data, blink) => {
	/** @type {string[]} */
	let arr = data.split(" ");
	while (blink-- > 0) {
		const tmp = [];
		for (let i = 0; i < arr.length; i++) {
			tmp.push(...transform_naive(arr[i]));
		}
		arr = tmp;
	}
	return arr;
};

/**
 * @param {string} str
 * @param {number} count
 * @param {Map<string, number>} counts
 */
const transform_optimized = (str, count, counts) => {
	if (str === "0") {
		counts.set("1", (counts.get("1") || 0) + count);
	} else if ((str.length & 1) === 0) {
		const len = str.length / 2;
		[str.substring(0, len), str.substring(len)].forEach(num => {
			num = String(Number(num));
			counts.set(num, (counts.get(num) || 0) + count);
		});
	} else {
		str = String(2024 * Number(str));
		counts.set(str, (counts.get(str) || 0) + count);
	}
};

/**
 * @param {string} data
 * @param {number} blink
 * @returns {number}
 */
export const stones_after_blinks_optimized = (data, blink) => {
	/** @type {Map<string, number>} */
	let counts = new Map();
	for (const str of data.split(" ")) {
		counts.set(str, (counts.get(str) || 0) + 1);
	}
	while (blink-- > 0) {
		let next_counts = new Map();
		counts.forEach((count, stone) => {
			transform_optimized(stone, count, next_counts);
		});
		counts = next_counts;
	}
	return Array.from(counts.values()).reduce((sum, curr) => sum + curr, 0);
};

