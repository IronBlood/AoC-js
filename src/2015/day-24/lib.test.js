import { describe, it, expect } from '@jest/globals';
import {
	get_quantum,
} from "./lib.js";

describe("2015-12-24", () => {
	const testcases = [
		[`1
2
3
4
5
7
8
9
10
11`, 3, 99],
		[`1
2
3
4
5
7
8
9
10
11`, 4, 44],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_quantum(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

