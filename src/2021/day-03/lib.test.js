import { describe, it, expect } from '@jest/globals';
import {
	get_power_consumption,
	get_life_support_rating,
} from "./lib.js";

describe("2021-12-03", () => {
	const testcases = [
		[`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`, 198, 230],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_power_consumption(tc[0])).toBe(tc[1]);
			expect(get_life_support_rating(tc[0])).toBe(tc[2]);
		});
	}
});
