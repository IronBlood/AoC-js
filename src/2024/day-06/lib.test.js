import {
	count_distinct,
	possible_loops,
} from "./lib.js";

	const testcases = [
	[`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`, 41, 6],
];

describe("2024-12-06 p1", () => {
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_distinct(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-06 p2", () => {
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(possible_loops(tc[0])).toBe(tc[2]);
		})
	}
});

