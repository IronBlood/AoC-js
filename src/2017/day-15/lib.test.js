import { describe, it, expect } from '@jest/globals';
import {
	find_pairs,
	find_pairs2,
} from "./lib.js";

describe("2017-12-15 p1", () => {
	/** @type {[string, number][]} */
	const testcases = [
		[`Generator A starts with 65
Generator B starts with 8921`, 588],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_pairs(tc[0])).toBe(tc[1]);
			expect(find_pairs2(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-15 p2", () => {
	/** @type {[string, number][]} */
	const testcases = [
		[`Generator A starts with 65
Generator B starts with 8921`, 309],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_pairs(tc[0], 2)).toBe(tc[1]);
			expect(find_pairs2(tc[0], 2)).toBe(tc[1]);
		})
	}
});

