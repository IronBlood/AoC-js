import { describe, it, expect } from '@jest/globals';
import {
	total_score,
} from "./lib.js";

describe("2022-12-02", () => {
	const testcases = [
		[`A Y
B X
C Z`, 15, 12],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			// expect(total_score(tc[0])).toBe(tc[1]);
			expect(total_score(tc[0], 2)).toBe(tc[2]);
		});
	}
});
