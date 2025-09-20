import { describe, it, expect } from '@jest/globals';
import {
	solve,
} from "./lib.js";

describe("2023-12-10 p1", () => {
	const testcases = [
		[`.....
.S-7.
.|.|.
.L-J.
.....`, 4],
		[`..F7.
.FJ|.
SJ.L7
|F--J
LJ...`, 8],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(solve(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2023-12-10 p2", () => {
	const testcases = [
		[`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`, 4],
		[`..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........`, 4],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(solve(tc[0], 2)).toBe(tc[1]);
		});
	}
});
