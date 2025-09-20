import { describe, it, expect } from '@jest/globals';
import {
	sum_extrapolated,
} from "./lib.js";

describe("2023-12-09 p1", () => {
	const testcases = [
		[`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`, 114, 2],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_extrapolated(tc[0])).toBe(tc[1]);
			expect(sum_extrapolated(tc[0], 2)).toBe(tc[2]);
		});
	}
});
