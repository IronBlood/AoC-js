import { describe, it, expect } from '@jest/globals';
import {
	sum_priorities,
} from "./lib.js";

describe("2022-12-03 p1", () => {
	const testcases = [
		[`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`, 157, 70],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_priorities(tc[0])).toBe(tc[1]);
			expect(sum_priorities(tc[0], 2)).toBe(tc[2]);
		});
	}
});
