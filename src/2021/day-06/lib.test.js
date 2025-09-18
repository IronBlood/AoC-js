import { describe, it, expect } from '@jest/globals';
import {
	count_lanternfish,
} from "./lib.js";

describe("2021-12-06", () => {
	const testcases = [
		[ `3,4,3,1,2`, 18, 26 ],
		[ `3,4,3,1,2`, 80, 5934 ],
		[ `3,4,3,1,2`, 256, 26984457539 ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_lanternfish(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});
