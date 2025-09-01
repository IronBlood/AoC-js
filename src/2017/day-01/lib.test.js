import { describe, it, expect } from '@jest/globals';
import {
	get_captcha,
} from "./lib.js";

describe("2017-12-01 p1", () => {
	const testcases = [
		["1122", 3],
		["1111", 4],
		["91212129", 9],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_captcha(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-01 p2", () => {
	const testcases = [
		["1212", 6],
		["1221", 0],
		["123425", 4],
		["123123", 12],
		["12131415", 4],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_captcha(tc[0], 2)).toBe(tc[1]);
		})
	}
});

