import { describe, it, expect } from '@jest/globals';
import {
	count_rest_sand,
} from "./lib.js";

describe("2022-12-14", () => {
	const testcases = [
		[`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`, 24, 93],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_rest_sand(tc[0])).toBe(tc[1]);
			expect(count_rest_sand(tc[0], 2)).toBe(tc[2]);
		});
	}
});
