import {
	get_all,
	get_all_2_naive,
	get_all_2_linkedlist,
} from "./lib.js";

describe("2016-12-19 p1", () => {
	const testcases = [
		[4, 1],
		[5, 3],
		[6, 5],
		[10, 5],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_all(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-19 p2", () => {
	const testcases = [
		[5, 2],
		[12, 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_all_2_naive(tc[0])).toBe(tc[1]);
			expect(get_all_2_linkedlist(tc[0])).toBe(tc[1]);
		})
	}
});

