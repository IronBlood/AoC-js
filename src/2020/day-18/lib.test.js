import { describe, it, expect } from '@jest/globals';
import {
	evaluate1,
	evaluate2,
	calc2,
} from "./lib.js";

describe("2020-12-18 p1-ut_evaluate1", () => {
	const testcases = [
		[ "1 + 2 * 3 + 4 * 5 + 6", 71 ],
		[ "1 + (2 * 3) + (4 * (5 + 6))", 51 ],
		[ "2 * 3 + (4 * 5)", 26 ],
		[ "5 + (8 * 3 + 9 + 3 * 4 * 3)", 437 ],
		[ "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 12240 ],
		[ "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 13632 ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(evaluate1(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-18 p2-ut_calc2", () => {
	const testcases = [
		[ [ 3, "*", 5 ], 15 ],
		[ [ 3, "+", 5 ], 8 ],
		[ [ 2, "+", 3, "*", 4], 20 ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(calc2(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-18 p2-ut_evaluate2", () => {
	const testcases = [
		[ "1 + 2 * 3 + 4 * 5 + 6", 231 ],
		[ "1 + (2 * 3) + (4 * (5 + 6))", 51 ],
		[ "2 * 3 + (4 * 5)", 46 ],
		[ "5 + (8 * 3 + 9 + 3 * 4 * 3)", 1445 ],
		[ "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 669060 ],
		[ "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 23340 ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(evaluate2(tc[0])).toBe(tc[1]);
		});
	}
});
