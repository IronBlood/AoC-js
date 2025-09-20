import { describe, it, expect } from '@jest/globals';
import {
	sum_lengths,
} from "./lib.js";

describe("2023-12-11", () => {
	const data = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
	const testcases = [
		[2, 374],
		[10, 1030],
		[100, 8410],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_lengths(data, tc[0])).toBe(tc[1]);
		});
	}
});
