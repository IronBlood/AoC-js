import { describe, it, expect } from '@jest/globals';
import {
	count_steps,
} from "./lib.js";

describe("2017-12-05 p1", () => {
	const testcases = [
		[`0
3
0
1
-3`, 5],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_steps(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-05 p2", () => {
	const testcases = [
		[`0
3
0
1
-3`, 10],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_steps(tc[0], 2)).toBe(tc[1]);
		})
	}
});

