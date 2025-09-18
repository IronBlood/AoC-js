import { describe, it, expect } from '@jest/globals';
import {
	count_flashes,
} from "./lib.js";

describe("2021-12-11", () => {
	const testcases = [
		[`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`, 1656, 195],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_flashes(tc[0])).toBe(tc[1]);
			expect(count_flashes(tc[0], 2)).toBe(tc[2]);
		});
	}
});
