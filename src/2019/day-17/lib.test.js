import { describe, it, expect } from '@jest/globals';
import {
	sum_alignment,
} from "./lib.js";

describe("2019-12-17 p1-ut_sum_alignment", () => {
	const testcases = [
		[`..#..........
..#..........
#######...###
#.#...#...#.#
#############
..#...#...#..
..#####...^..`, 76],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_alignment(tc[0])).toBe(tc[1]);
		});
	}
});
