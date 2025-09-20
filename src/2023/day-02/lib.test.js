import { describe, it, expect } from '@jest/globals';
import {
	possible_ids,
	sum_power,
} from "./lib.js";

describe("2023-12-02", () => {
	const testcases = [
		[`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`, 8, 2286],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(possible_ids(tc[0])).toBe(tc[1]);
			expect(sum_power(tc[0])).toBe(tc[2]);
		});
	}
});
