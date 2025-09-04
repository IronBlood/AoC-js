import { describe, it, expect } from '@jest/globals';
import {
	get_error_rate
} from "./lib.js";

describe("2020-12-16 p1", () => {
	const testcases = [
		[`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`, 71],
	];

	for (let i = 0; i < testcases.length; i++) {
		const [input, expected] = testcases[i];
		it(`test-${i}`, () => {
			expect(get_error_rate(input)).toBe(expected);
		});
	}
});
