import { describe, it, expect } from '@jest/globals';
import {
	get_sum,
} from "./lib.js";

describe("2023-12-01 p1", () => {
	const testcases = [
		[`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`, 142],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_sum(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2023-12-01 p2", () => {
	const testcases = [
		[`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`, 281],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_sum(tc[0], 2)).toBe(tc[1]);
		});
	}
});
