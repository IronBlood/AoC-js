import { describe, it, expect } from '@jest/globals';
import {
	solve_22,
} from "./lib.js";

describe("2023-12-22 p1", () => {
	const testcases = [
		[`1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`, [5, 7]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(solve_22(tc[0])).toStrictEqual(tc[1]);
		});
	}
});
