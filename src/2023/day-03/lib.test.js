import { describe, it, expect } from '@jest/globals';
import {
	sum,
	gear_ratios,
} from "./lib.js";

describe("2023-12-03 p1", () => {
	const testcases = [
		[`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`, 4361, 467835],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum(tc[0])).toBe(tc[1]);
			expect(gear_ratios(tc[0])).toBe(tc[2]);
		});
	}
});
