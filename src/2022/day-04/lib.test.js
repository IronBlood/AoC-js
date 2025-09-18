import { describe, it, expect } from '@jest/globals';
import {
	count_fully_contain,
	count_overlap,
} from "./lib.js";

describe("2022-12-04 p1", () => {
	const testcases = [
		[`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`, 2, 4],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_fully_contain(tc[0])).toBe(tc[1]);
			expect(count_overlap(tc[0])).toBe(tc[2]);
		});
	}
});
