import { describe, it, expect } from '@jest/globals';
import {
	remain_units,
	shortest,
} from "./lib.js";

describe("2018-12-05 p1", () => {
	const testcases = [
		["dabAcCaCBAcCcaDA", 10],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(remain_units(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-05 p2", () => {
	const testcases = [
		["dabAcCaCBAcCcaDA", 4],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(shortest(tc[0])).toBe(tc[1]);
		})
	}
});

