import { describe, it, expect } from '@jest/globals';
import {
	largest1,
	largest2,
    total_joltage,
} from "./lib.js";

describe("2025-12-01 p1_ut_largest", () => {
	/** @type {[string, number][]} */
	const testcases = [
		["987654321111111", 98],
		["811111111111119", 89],
		["234234234234278", 78],
		["818181911112111", 92],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(largest1(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2025-12-01 p2_ut_largest", () => {
	/** @type {[string, number, number][]} */
	const testcases = [
		["987654321111111", 98, 987654321111],
		["811111111111119", 89, 811111111119],
		["234234234234278", 78, 434234234278],
		["818181911112111", 92, 888911112111],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(largest2(tc[0], 2)).toBe(tc[1]);
			expect(largest2(tc[0], 12)).toBe(tc[2]);
		});
	}
});

describe("2025-12-03 p1", () => {
	/** @type {[string, number, number][]} */
	const testcases = [
		[`987654321111111
811111111111119
234234234234278
818181911112111`, 357, 3121910778619],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_joltage(tc[0])).toBe(tc[1]);
			expect(total_joltage(tc[0], 2)).toBe(tc[2]);
		});
	}
});
