import { describe, it, expect } from '@jest/globals';
import {
	is_valid,
	gen_next,
} from "./lib.js";

describe("2015-12-11 p1-is_valid", () => {
	const testcases = [
		["hijklmmn", false],
		["abbceffg", false],
		["abbcegjk", false],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_valid(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2015-12-11 p1-gen_next", () => {
	const testcases = [
		["abcdefgh", "abcdffaa"],
		["ghijklmn", "ghjaabcc"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(gen_next(tc[0])).toBe(tc[1]);
		})
	}
});

