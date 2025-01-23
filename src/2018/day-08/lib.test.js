import {
	sum_metadata,
	root_value,
} from "./lib.js";

describe("2018-12-08 p1", () => {
	const testcases = [
		[`2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`, 138],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_metadata(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-08 p2", () => {
	const testcases = [
		[`2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`, 66],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(root_value(tc[0])).toBe(tc[1]);
		})
	}
});

