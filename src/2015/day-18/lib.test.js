import { describe, it, expect } from '@jest/globals';
import {
	count_lights,
} from "./lib.js";

describe("2015-12-18 p1", () => {
	const testcases = [
		[`.#.#.#
...##.
#....#
..#...
#.#..#
####..`, 4, 4],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_lights(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

describe("2015-12-18 p2", () => {
	const testcases = [
		[`##.#.#
...##.
#....#
..#...
#.#..#
####.#`, 5, 17],
		[`#.##.#
####.#
...##.
......
#...#.
#.####`, 4, 17],
		[`#..#.#
#....#
.#.##.
...##.
.#..##
##.###`, 3, 17],
		[`#...##
####.#
..##.#
......
##....
####.#`, 2, 17],
		[`#.####
#....#
...#..
.##...
#.....
#.#..#`, 1, 17],
		[`##.###
.##..#
.##...
.##...
#.#...
##...#`, 0, 17],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_lights(tc[0], tc[1], 2)).toBe(tc[2]);
		})
	}
});

