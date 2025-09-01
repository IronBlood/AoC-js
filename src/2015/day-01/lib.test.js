import { describe, it, expect } from '@jest/globals';
import {
	first_enter_basement,
	floor,
} from "./lib.js";

describe("2015-12-01 p1", () => {
	const testcases = [
		["(())", 0],
		["(((", 3],
		["(()(()(", 3],
		["))(((((", 3],
		["())", -1],
		["))(", -1],
		[")))", -3],
		[")())())", -3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(floor(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2015-12-01 p2", () => {
	const testcases = [
		[")", 1],
		["()())", 5],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(first_enter_basement(tc[0])).toBe(tc[1]);
		})
	}
});

