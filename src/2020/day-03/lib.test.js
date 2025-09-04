import { describe, it, expect } from '@jest/globals';
import {
	count_trees,
	count_trees_2,
} from "./lib.js";

describe("2020-12-03", () => {
	const testcases = [
		[`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`, 7, 336],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_trees(tc[0])).toBe(tc[1]);
			expect(count_trees_2(tc[0])).toBe(tc[2]);
		});
	}
});
