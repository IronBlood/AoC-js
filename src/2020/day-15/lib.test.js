import { describe, it, expect } from '@jest/globals';
import {
	get_nth_num,
} from "./lib.js";

describe("2020-12-15 p1", () => {
	const testcases = [
		["0,3,6", 436],
		["1,3,2", 1],
		["2,1,3", 10],
		["1,2,3", 27],
		["2,3,1", 78],
		["3,2,1", 438],
		["3,1,2", 1836],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_nth_num(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-15 p2", () => {
	const testcases = [
		["0,3,6", 175594],
		["1,3,2", 2578],
		["2,1,3", 3544142],
		["1,2,3", 261214],
		["2,3,1", 6895259],
		["3,2,1", 18],
		["3,1,2", 362],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_nth_num(tc[0], 2)).toBe(tc[1]);
		});
	}
});
