import { describe, it, expect } from '@jest/globals';
import {
	get_lowest_points,
	get_basins,
} from "./lib.js";

describe("2021-12-09", () => {
	const testcases = [
		[`2199943210
3987894921
9856789892
8767896789
9899965678`, 15, 1134],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_lowest_points(tc[0])).toBe(tc[1]);
			expect(get_basins(tc[0])).toBe(tc[2]);
		});
	}
});
