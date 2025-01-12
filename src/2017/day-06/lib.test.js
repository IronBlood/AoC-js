import {
	count_cycles,
} from "./lib.js";

describe("2017-12-06 p1", () => {
	const testcases = [
		[`0 2 7 0`, 5],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_cycles(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-06 p2", () => {
	const testcases = [
		[`0 2 7 0`, 4]
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_cycles(tc[0], 2)).toBe(tc[1]);
		})
	}
});

