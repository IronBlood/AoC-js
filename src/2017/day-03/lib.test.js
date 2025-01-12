import {
	get_steps,
	first_larger_value,
} from "./lib.js";

describe("2017-12-03 p1", () => {
	const testcases = [
		[1, 0],
		[12, 3],
		[23, 2],
		[25, 4],
		[1024, 31],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_steps(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-03 p2", () => {
	const testcases = [
		[3, 4],
		[6, 10],
		[7, 10],
		[330, 351],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(first_larger_value(tc[0])).toBe(tc[1]);
		})
	}
});

