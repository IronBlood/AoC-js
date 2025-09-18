import { describe, it, expect } from '@jest/globals';
import {
	get_password,
	get_password2,
	parse_instructions,
	get_borders,
	get_rows_and_cols_with_walls,
	build_graph,
} from "./lib.js";

describe("2022-12-22 p1-ut_parse_instructions", () => {
	const testcases = [
		[ "10R5L5R10L4R5L5", [ 10, "R", 5, "L", 5, "R", 10, "L", 4, "R", 5, "L", 5 ] ],
		[ "10x1", false ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			if (!tc[1]) {
				expect(() => parse_instructions(tc[0])).toThrow();
			} else {
				const res = parse_instructions(tc[0]);
				expect(res.join("")).toBe(tc[0]);
				expect(res).toStrictEqual(tc[1]);
			}
		});
	}
});

describe("2022-12-22 p1-ut borders and neighbors", () => {
	const grid = [
		[ " ", ".", "#" ],
		[ "#", ".", "." ],
		[ " ", " ", "." ],
	];

	describe("get-borders", () => {
		const testcases = [
			[ 0, 1, { N: -1, W: 0, E: 3, S: 2 }  ],
			[ 1, 1, { N: -1, W: -1, E: 3, S: 2 } ],
			[ 1, 2, { N: -1, W: -1, E: 3, S: 3 } ],
			[ 2, 2, { N: -1, W: 1, E: 3, S: 3 }  ],
		];
		for (let i = 0; i < testcases.length; i++) {
			it(`test-${i}`, () => {
				const tc = testcases[i];
				const borders = get_borders(grid, tc[0], tc[1]);
				const keys = Object.keys(borders);
				expect(keys.length).toBe(4);
				for (const key of keys) {
					expect(borders[key]).toBe(tc[2][key]);
				}
			});
		}
	});

	describe("get-neighbors", () => {
		const { rows, cols } = get_rows_and_cols_with_walls(grid);
		const { tiles } = build_graph(grid, rows, cols);

		const res = [
			[
				"0,1",
				2,
				{
					E: 0,
					W: 0,
				},
			],
			[
				"1,1",
				2,
				{
					E: 1,
					W: 0,
				},
			],
			[
				"1,2",
				4,
				{
					N: 0,
					S: 1,
					E: 0,
					W: 1,
				},
			],
			[
				"2,2",
				2,
				{
					N: 1,
					S: 0,
				},
			],
		];

		it("check graph size", () => {
			expect(tiles.size).toBe(res.length);
			for (const [key] of res) {
				expect(tiles.has(key)).toBeTruthy();
			};
		});

		for (let i = 0; i < res.length; i++) {
			const [key, entry_keys, entry] = res[i];
			it(`check entry value ${i}`, () => {
				const tile = tiles.get(key);
				expect(tile).not.toBeUndefined();
				if (!tile) { throw "never" }

				const neighbors = tile.farthest_tiles;
				const n_keys = Object.keys(neighbors);
				expect(n_keys.length).toBe(entry_keys);

				for (const k of n_keys) {
					expect(neighbors[k]).toBe(entry[k]);
				}
			});
		}
	});
});

describe("2022-12-22", () => {
	const testcases = [
		[`        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`, 6032, 5031],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_password(tc[0])).toBe(tc[1]);
			expect(get_password2(tc[0])).toBe(tc[2]);
		});
	}
});
