import {
	stones_after_blinks_naive,
} from "./lib.js";

describe("2024-12-11", () => {
	const testcases = [
		["0 1 10 99 999", 1, "1 2024 1 0 9 9 2021976"],
		["125 17", 6, "2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(stones_after_blinks_naive(tc[0], tc[1]).join(" ")).toBe(tc[2]);
		})
	}
});

