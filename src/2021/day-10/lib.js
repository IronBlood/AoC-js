/** @type {Record<string, number>} */
const SCORES = {
	")": 3,
	"]": 57,
	"}": 1197,
	">": 25137,
};

/**
 * @param {string} str
 */
export const find_score = (str) => {
	/** @type {string[]} */
	const stack = [];

	for (let i = 0; i < str.length; i++) {
		const c = str[i];
		switch (c) {
			case "(": stack.push(")"); break;
			case "[": stack.push("]"); break;
			case "{": stack.push("}"); break;
			case "<": stack.push(">"); break;
			default:
				if (stack.length === 0 || stack.pop() !== c) {
					return SCORES[c];
				}
		}
	}
	return stack.map(x => {
		switch(x) {
			case ")": return 1;
			case "]": return 2;
			case "}": return 3;
			case ">": return 4;
		};
		return 0;
	}).reverse();
};

/**
 * @param {string} data
 */
export const find_total_score = (data) => {
	return data.split("\n").reduce((sum, line) => {
		const res = find_score(line);
		return sum + (typeof res === "number" ? res : 0)
	}, 0);
};

/**
 * 5-based
 * @param {number[]} nums
 */
const arr_to_num = nums => {
	return nums.reduce((acc, curr) => acc * 5 + curr, 0);
};

/**
 * @param {string} data
 */
export const find_middle_score = (data) => {
	const scores = [];

	data.split("\n").forEach(line => {
		const res = find_score(line);
		if (Array.isArray(res)) {
			scores.push(arr_to_num(res));
		}
	});

	scores.sort((a, b) => a - b);
	const mid = scores.length / 2;

	return mid !== Math.trunc(mid) ? scores[Math.trunc(mid)] : [
		scores[mid],
		scores[mid+1],
	];
};
