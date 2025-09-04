import { describe, it, expect } from '@jest/globals';
import {
	parse_row_num,
	parse_col_num,
} from "./lib.js";

describe("2020-12-05 p1-ut_parse_row_num", () => {
	const testcases = [
		["BFFFBBF", 70],
		["FFFBBBF", 14],
		["BBFFBBF", 102],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(parse_row_num(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-05 p1-ut_parse_col_num", () => {
	const testcases = [
		["RRR", 7],
		["RLL", 4],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(parse_col_num(tc[0])).toBe(tc[1]);
		});
	}
});
