import { describe, it, expect } from '@jest/globals';
import {
	count_empty_rectangles,
} from "./lib.js";

describe("2022-12-23 p1", () => {
	const testcases = [
		[`....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`, 110, 20],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_empty_rectangles(tc[0])).toBe(tc[1]);
			expect(count_empty_rectangles(tc[0], 2)).toBe(tc[2]);
		});
	}
});
