import { describe, it, expect } from '@jest/globals';
import {
	fewest_minutes,
	fewest_minutes2,
	is_direction,
} from "./lib.js";

describe("2022-12-24 p1-ut_is_direction", () => {
	const testcases = [
		[">", true],
		["v", true],
		["<", true],
		["^", true],
		["1", false],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_direction(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2022-12-24 p1", () => {
	const testcases = [
		[`#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`, 18, 54],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(fewest_minutes(tc[0])).toBe(tc[1]);
			expect(fewest_minutes2(tc[0])).toBe(tc[2]);
		});
	}
});
