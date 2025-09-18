// Credit: https://github.com/dphilipson/advent-of-code-2021/blob/master/src/days/day24.rs
// @ts-check

/**
 * @param {string} data
 * @returns {number[][]} an array of `[DZ, AX, AY]`
 */
const get_pairs = (data) => {
	const lines = data.split("\n");

	const LINES_PER_BLOCK = 18;
	const OFFSET_DIV_Z = 4;
	const OFFSET_ADD_X = 5;
	const OFFSET_ADD_Y = 15;

	/** @type {number[][]} */
	const res = [];

	for (let i = 0; i < 14; i++) {
		res.push([
			lines[LINES_PER_BLOCK * i + OFFSET_DIV_Z],
			lines[LINES_PER_BLOCK * i + OFFSET_ADD_X],
			lines[LINES_PER_BLOCK * i + OFFSET_ADD_Y],
		].map(line => {
			const arr = line.split(" ");
			return +arr[2];
		}));
	}

	return res;
};

/**
 * @param {number[][]} pairs
 */
const assert_push_pop = (pairs) => {
	if (pairs.length !== 14)
		throw new Error("invalid");

	let count = 0;
	for (const [op] of pairs) {
		if (op === 1) {
			count++;
		} else if (op === 26) {
			if (count <= 0)
				throw new Error("invalid");
			count--;
		} else {
			throw new Error("invalid");
		}
	}

	if (count !== 0)
		throw new Error("invalid");
};

/**
 * @param {number[][]} pairs
 * @returns {Array<{ low: number, high: number }>}
 */
const compile = (pairs) => {
	/** @type {number[]} */
	const stack = [];
	/** @type {number[]} */
	const offset = Array(14).fill(0);
	const parsed = Array.from({ length: 14 }, () => ({ low: 1, high: 9 }));

	for (let i = 0; i < 14; i++) {
		const [DZ, AX, AY] = pairs[i];
		if (DZ === 1) {
			stack.push(i);
			offset[i] = AY;
		} else {
			const prev = stack.pop();
			if (prev === undefined) {
				throw new Error("never");
			}
			const check = AX + offset[prev];

			if (check > 0) {
				parsed[i].low += check;
				parsed[prev].high -= check;
			} else {
				parsed[i].high += check;
				parsed[prev].low -= check;
			}
		}
	}

	return parsed;
};

/**
 * @param {string} data
 */
export const get_model_number = (data, part = 1) => {
	const pairs = get_pairs(data);

	assert_push_pop(pairs);

	const ans = compile(pairs).map(x => part === 1 ? x.high : x.low).join("");
	return ans;
};
