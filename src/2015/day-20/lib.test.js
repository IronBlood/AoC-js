import {
	count_presents_by_houseid,
} from "./lib.js";

describe("2015-12-20 p1", () => {
	const testcases = [
		[1, 10],
		[2, 30],
		[3, 40],
		[4, 70],
		[5, 60],
		[6, 120],
		[7, 80],
		[8, 150],
		[9, 130],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_presents_by_houseid(tc[0])).toBe(tc[1]);
		})
	}
});

