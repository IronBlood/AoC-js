import { describe, it, expect } from '@jest/globals';
import {
	get_code,
	get_code2,
} from "./lib.js";

describe("2016-12-02 p1", () => {
	const testcases = [
		[`ULL
RRDDD
LURDL
UUUUD`, "1985"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_code(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-02 p2", () => {
	const testcases = [
		[`ULL
RRDDD
LURDL
UUUUD`, "5DB3"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_code2(tc[0])).toBe(tc[1]);
		})
	}
});

