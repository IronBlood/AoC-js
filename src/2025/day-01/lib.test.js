import { describe, it, expect } from '@jest/globals';
import { actual_passwd } from "./lib.js";

describe("2025-12-01", () => {
	/** @type {[string, number, number][]} */
	const testcases = [
		[`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`, 3, 6],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(actual_passwd(tc[0])).toBe(tc[1]);
			expect(actual_passwd(tc[0], 2)).toBe(tc[2]);
		});
	}
});

