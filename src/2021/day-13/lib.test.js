import { describe, it, expect } from '@jest/globals';
import {
	count_visible_dots_after_first_fold,
} from "./lib.js";

describe("2021-12-13 p1", () => {
	const testcases = [
		[`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`, 17],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_visible_dots_after_first_fold(tc[0])).toBe(tc[1]);
		});
	}
});
