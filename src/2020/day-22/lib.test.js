import { describe, it, expect } from '@jest/globals';
import {
	winner_score,
} from "./lib.js";

describe("2020-12-22 p2", () => {
	const testcases = [
		[`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`, 306, 291],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(winner_score(tc[0])).toBe(tc[1]);
			expect(winner_score(tc[0], 2)).toBe(tc[2]);
		});
	}
});
