import { describe, it, expect } from '@jest/globals';
import {
	count_squares,
	count_regions,
} from "./lib.js";

describe("2017-12-14 p1", () => {
	const testcases = [
		["flqrgnkx", 8108],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_squares(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-14 p2", () => {
	const testcases = [
		["flqrgnkx", 1242],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_regions(tc[0])).toBe(tc[1]);
		})
	}
});

