import { describe, it, expect } from '@jest/globals';
import {
	count_valid_passwords,
} from "./lib.js";

describe("2020-12-02 p1", () => {
	const testcases = [
		[`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`, 2],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_valid_passwords(tc[0])).toBe(tc[1]);
		});
	}
});
