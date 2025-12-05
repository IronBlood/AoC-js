import { describe, it, expect } from '@jest/globals';
import {
	count_rolls,
	count_rolls_all,
} from "./lib.js";

describe("2025-12-04 p1", () => {
	/** @type {[string, number, number][]} */
	const testcases = [
		[`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`, 13, 43],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_rolls(tc[0])).toBe(tc[1]);
			expect(count_rolls_all(tc[0])).toBe(tc[2]);
		});
	}
});
