import { describe, it, expect } from '@jest/globals';
import {
	count_fresh,
} from "./lib.js";

describe("2025-12-05", () => {
	/** @type {[string, number, number][]} */
	const testcases = [
		[`3-5
10-14
16-20
12-18

1
5
8
11
17
32`, 3, 14],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_fresh(tc[0])).toBe(tc[1]);
			expect(count_fresh(tc[0], 2)).toBe(tc[2]);
		});
	}
});
