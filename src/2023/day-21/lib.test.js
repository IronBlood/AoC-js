import { describe, it, expect } from '@jest/globals';
import {
	count_tiles,
	count_tiles2,
} from "./lib.js";

describe("2023-12-21 p1", () => {
	const testcases = [
		[`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`, 6, 16],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_tiles(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});
