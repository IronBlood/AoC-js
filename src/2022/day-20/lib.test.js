import { describe, it, expect } from '@jest/globals';
import {
	three_sum,
} from "./lib.js";

describe("2022-12-20 p1", () => {
	const testcases = [
		[`1
2
-3
3
-2
0
4`, 3, 1623178306],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(three_sum(tc[0])).toBe(tc[1]);
			expect(three_sum(tc[0], 2)).toBe(tc[2]);
		});
	}
});
