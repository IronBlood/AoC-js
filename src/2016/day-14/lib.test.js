import { describe, it, expect } from '@jest/globals';
import {
	get_index,
} from "./lib.js";

describe("2016-12-14 p1", () => {
	const testcases = [
		[`abc`, 22728],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_index(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-14 p2", () => {
	const testcases = [
		[`abc`, 22551],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_index(tc[0], 2)).toBe(tc[1]);
		})
	}
});

