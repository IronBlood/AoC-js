import { describe, it, expect } from '@jest/globals';
import {
	min_steps,
	first_block,
} from "./lib.js";

describe("2024-12-18 p1", () => {
	const testcases = [
		[`5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`, 12, [6, 6], 22],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(min_steps(tc[0], tc[1], tc[2])).toBe(tc[3]);
		})
	}
});

describe("2024-12-18 p2", () => {
	const testcases = [
		[`5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`, [6, 6], "6,1"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(first_block(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

