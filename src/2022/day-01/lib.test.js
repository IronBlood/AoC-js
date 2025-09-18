import { describe, it, expect } from '@jest/globals';
import {
	find_most,
	sum_top_three,
} from "./lib.js";

describe("2022-12-01", () => {
	const testcases = [
		[`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`, 24000, 45000],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_most(tc[0])).toBe(tc[1]);
			expect(sum_top_three(tc[0])).toBe(tc[2]);
		});
	}
});
