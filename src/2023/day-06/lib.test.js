import { describe, it, expect } from '@jest/globals';
import {
	winning_ways,
	mul,
	mul2,
} from "./lib.js";

describe("2023-12-06 p1-ut_winning_ways", () => {
	const testcases = [
		[7, 9, 4],
		[15, 40, 8],
		[30, 200, 9],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(winning_ways(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});

describe("2023-12-06 p1", () => {
	const testcases = [
		[`Time:      7  15   30
Distance:  9  40  200`, 288, 71503],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(mul(tc[0])).toBe(tc[1]);
			expect(mul2(tc[0])).toBe(tc[2]);
		});
	}
});
