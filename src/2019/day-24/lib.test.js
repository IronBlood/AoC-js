import { describe, it, expect } from '@jest/globals';
import {
	gridfy,
	serialize,
	rate,
	mutate,
	get_rating,
	get_adjacent_r,
	count_bugs,
} from "./lib.js";

describe("2019-12-24 p1-ut_rate", () => {
	/** @type {[string, number][]} */
	const testcases = [
		[`.....
.....
.....
#....
.#...`, 2129920],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(rate(gridfy(tc[0]))).toBe(tc[1]);
		});
	}
});

describe("2019-12-24 p1-ut_mutate", () => {
	const testcases = [
		[`....#
#..#.
#..##
..#..
#....`, `#..#.
####.
###.#
##.##
.##..`],
		[`#..#.
####.
###.#
##.##
.##..`, `#####
....#
....#
...#.
#.###`],
		[`#####
....#
....#
...#.
#.###`, `#....
####.
...##
#.##.
.##.#`],
		[`#....
####.
...##
#.##.
.##.#`, `####.
....#
##..#
.....
##...`],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(serialize(mutate(gridfy(tc[0])))).toBe(tc[1]);
		});
	}
});

describe("2019-12-24 p1", () => {
	const testcases = [
		[`....#
#..#.
#..##
..#..
#....`, 2129920],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_rating(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2019-12-24 p2-ut_get_adjacent_r", () => {
	const testcases = [
		// Tile 19 on level 0
		[
			[0, 3, 3],
			[
				[0, 3, 2],
				[0, 3, 4],
				[0, 2, 3],
				[0, 4, 3],
			],
		],
		// Tile G at inner level (level –1, coords 1,1)
		[
			[-1, 1, 1],
			[
				[-1, 0, 1],  // B
				[-1, 1, 0],  // F
				[-1, 1, 2],  // H
				[-1, 2, 1],  // L
			],
		],
		// Tile D at inner level (–1,0,3)
		[
			[-1, 0, 3],
			[
				[-1, 0, 2],  // C
				[-1, 0, 4],  // E
				[-1, 1, 3],  // I
				[0, 1, 2],   // 8
			],
		],
		// Tile E at inner level (–1,0,4)
		[
			[-1, 0, 4],
			[
				[-1, 0, 3],  // D
				[-1, 1, 4],  // J
				[0, 1, 2],   // 8
				[0, 2, 3],   // 14
			],
		],
		// Tile 14 on level 0 (coords 2,3)
		[
			[0, 2, 3],
			[
				[0, 1, 3],   // 9
				[0, 2, 4],   // 15
				[0, 3, 3],   // 19
				[-1, 0, 4],  // E
				[-1, 1, 4],  // J
				[-1, 2, 4],  // O
				[-1, 3, 4],  // T
				[-1, 4, 4],  // Y
			],
		],
		// Tile N at inner level (–1,2,3)
		[
			[-1, 2, 3],
			[
				[-1, 1, 3],  // I
				[-1, 2, 4],  // O
				[-1, 3, 3],  // S
				[-2, 0, 4],  // deeper-level row 0 edge
				[-2, 1, 4],  // deeper-level row 1 edge
				[-2, 2, 4],  // deeper-level row 2 edge
				[-2, 3, 4],  // deeper-level row 3 edge
				[-2, 4, 4],  // deeper-level row 4 edge
			],
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			/** @type {Set<string>} */
			const set = new Set();
			get_adjacent_r(...tc[0]).forEach(x => set.add(x.join(",")));

			expect(set.size).toBe(tc[1].length);

			for (const x of tc[1]) {
				const key = x.join(",");
				expect(set.has(key)).toBeTruthy();
				set.delete(key);
			}

			expect(set.size).toBe(0);
		});
	}
});

describe("2019-12-24 p2", () => {
	const testcases = [
		[`....#
#..#.
#.?##
..#..
#....`, 10, 99],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_bugs(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});
