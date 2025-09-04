import { describe, it, expect } from '@jest/globals';
import {
	get_first_exception,
} from "./lib.js";

describe("2020-12-09 p1", () => {
	const testcases = [
		[`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`, 5, 127, 62],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_first_exception(tc[0], tc[1])).toBe(tc[2]);
			expect(get_first_exception(tc[0], tc[1], 2)).toBe(tc[3]);
		});
	}
});
