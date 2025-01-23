import {
	largest_area,
	safe_regions,
} from "./lib.js";

describe("2018-12-06 p1", () => {
	const testcases = [
		[`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`, 17],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(largest_area(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-06 p2", () => {
	const testcases = [
		[`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`, 16],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(safe_regions(tc[0], 32)).toBe(tc[1]);
		})
	}
});

