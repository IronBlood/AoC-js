import { describe, it, expect } from '@jest/globals';
import {
	calc,
	calc_2,
} from "./lib.js";

describe("2019-12-01 p1", () => {
	const testcases = [
		[12, 2],
		[14, 2],
		[1969, 654],
		[100756, 33583],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(calc(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2019-12-01 p2", () => {
	const testcases = [
		[14, 2],
		[1969, 966],
		[100756, 50346],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(calc_2(tc[0])).toBe(tc[1]);
		});
	}
});
