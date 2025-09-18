import { describe, it, expect } from '@jest/globals';
import {
	count_overlapped_points,
} from "./lib.js";

describe("2021-12-05", () => {
	const testcases = [
		[`0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`, 5, 12],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_overlapped_points(tc[0])).toBe(tc[1]);
			expect(count_overlapped_points(tc[0], 2)).toBe(tc[2]);
		});
	}
});
