import { describe, it, expect } from '@jest/globals';
import {
	count_decompressed_length,
	count_decompressed_length_2,
} from "./lib.js";

describe("2016-12-09 p1", () => {
	const testcases = [
		["ADVENT", 6],
		["A(1x5)BC", 7],
		["(3x3)XYZ", 9],
		["A(2x2)BCD(2x2)EFG", 11],
		["(6x1)(1x3)A", 6],
		["X(8x2)(3x3)ABCY", 18],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_decompressed_length(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-09 p2", () => {
	const testcases = [
		["(3x3)XYZ", 9],
		["X(8x2)(3x3)ABCY", "XABCABCABCABCABCABCY".length],
		["(27x12)(20x12)(13x14)(7x10)(1x12)A", 241920],
		["(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN", 445],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_decompressed_length_2(tc[0])).toBe(tc[1]);
		})
	}
});

