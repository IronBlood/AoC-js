import { describe, it, expect } from '@jest/globals';
import {
	total_winning,
} from "./lib.js";

describe("2023-12-07 p1", () => {
	const testcases = [
		[`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`, 6440, 5905],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_winning(tc[0])).toBe(tc[1]);
			expect(total_winning(tc[0], 2)).toBe(tc[2]);
		});
	}
});
