import { describe, it, expect } from '@jest/globals';
import {
	find_mirror,
	sum_notes,
} from "./lib.js";

describe("2023-12-13 p1-ut_find_mirror", () => {
	const testcases = [
		[`
#..#.....
.##.##..#
####..###
#..###.##
#..#.###.
####.....
....#..#.
#####....
#####....
....#..#.
####....#
#..#.###.
#..###.##`, 2],
		[`
...#.#.#.####.#.#
..###..###..###..
##.###..........#
....####...#..###
...#.#...#..#...#
##...##.##..##.##
###..##.#....#.##
..##.##...##...##
##.##............`, 1],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_mirror(tc[0].trim().split("\n"), 1)).toBe(tc[1]);
		});
	}
});

describe("2023-12-13 p1", () => {
	const testcases = [
		[`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`, 405, 400],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_notes(tc[0])).toBe(tc[1]);
			expect(sum_notes(tc[0], 2)).toBe(tc[2]);
		});
	}
});
