import { describe, it, expect } from '@jest/globals';
import {
	fewest_steps,
} from "./lib.js";

describe("2022-12-12", () => {
	const testcases = [
		[`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`, 31, 29],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(fewest_steps(tc[0])).toBe(tc[1]);
			expect(fewest_steps(tc[0], 2)).toBe(tc[2]);
		});
	}
});
