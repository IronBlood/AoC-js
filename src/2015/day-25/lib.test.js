import {
	get_next_code,
	get_num_by_xy,
	get_code,
} from "./lib.js";

describe("2015-12-25 p1-gen_next_code", () => {
	const testcases = [
		[20151125, 31916031],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_next_code(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2015-12-25 p1-get_num", () => {
	const testcases = [
		[1,1,1],
		[2,2,5],
		[3,4,19],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_num_by_xy(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

describe("2015-12-25 p1-get_code", () => {
	const testcases = [
		[2, 1, 31916031],
		[2, 2, 21629792],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_code(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

