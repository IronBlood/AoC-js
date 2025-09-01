import { describe, it, expect } from '@jest/globals';
import {
	get_value,
	after_zero,
} from "./lib.js";

describe("2017-12-17 p1", () => {
	const testcases = [
		[3, 638],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_value(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-17 p2", () => {
	const testcases = [
		[3, 4, 2],
		[3, 5, 5],
		[3, 6, 5],
		[3, 7, 5],
		[3, 8, 5],
		[3, 9, 9],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(after_zero(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

