import {
	overlapping_area,
} from "./lib.js";

describe("2018-12-03 p1", () => {
	const testcases = [
		[`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`, 4],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(overlapping_area(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-03 p2", () => {
	const testcases = [
		[`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`, 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(overlapping_area(tc[0], 2)).toBe(tc[1]);
		})
	}
});

