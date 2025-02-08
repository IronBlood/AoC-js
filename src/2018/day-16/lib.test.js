import {
	count_three_opcodes,
} from "./lib.js";

describe("2018-12-16 p1", () => {
	const testcases = [
		[`Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`, 1],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_three_opcodes(tc[0])).toBe(tc[1]);
		})
	}
});

