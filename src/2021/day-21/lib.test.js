import { describe, it, expect } from '@jest/globals';
import {
	get_losing_point,
	get_most_winning,
} from "./lib.js";

describe("2021-12-21", () => {
	const testcases = [
		[`Player 1 starting position: 4
Player 2 starting position: 8`, 739785, 444356092776315],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_losing_point(tc[0])).toBe(tc[1]);
			expect(get_most_winning(tc[0])).toBe(tc[2]);
		});
	}
});
