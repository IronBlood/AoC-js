import { describe, it, expect } from '@jest/globals';
import {
	calc_load,
	do_cycle,
	total_load,
	total_load2,
} from "./lib.js";

describe("2023-12-14 p1-ut_calc_load", () => {
	const testcases = [
		[`OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`, 136],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(calc_load(tc[0].trim().split("\n").map(line => line.split("")))).toBe(tc[1]);
		});
	}
});

describe("2023-12-14 p1", () => {
	const testcases = [
		[`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`, 136],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_load(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2023-12-14 p2-ut_do_cycle", () => {
	const data = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
	/** @type {[number, string][]} */
	const testcases = [
		[1, `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`],
		[2, `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O`],
		[3, `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O`],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const grid = data.split("\n").map(line => line.split(""));
			do_cycle(grid, tc[0]);
			const str = grid.map(row => row.join("")).join("\n");
			expect(str).toBe(tc[1]);
		});
	}
});

describe("2023-12-14 p2", () => {
	const testcases = [
		[`O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`, 64],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_load2(tc[0])).toBe(tc[1]);
		});
	}
});
