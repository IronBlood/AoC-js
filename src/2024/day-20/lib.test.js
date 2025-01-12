import {
	count_cheats_by_saving,
} from "./lib.js";

const data = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

describe("2024-12-20 p1", () => {
	const testcases = [
		[60, 1],
		[40, 2],
		[30, 4],
		[20, 5],
		[10, 10],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_cheats_by_saving(data, 2, tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-20 p2", () => {
	const testcases = [
		[76, 3],
		[74, 7],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_cheats_by_saving(data, 20, tc[0])).toBe(tc[1]);
		})
	}
});

