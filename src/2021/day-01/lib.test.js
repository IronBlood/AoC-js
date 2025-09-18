import { describe, it, expect } from '@jest/globals';
import {
	count_measurements,
} from "./lib.js";

describe("2021-12-01", () => {
	const testcases = [
		[`199
200
208
210
200
207
240
269
260
263`, 7, 5],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_measurements(tc[0])).toBe(tc[1]);
			expect(count_measurements(tc[0], 2)).toBe(tc[2]);
		});
	}
});
