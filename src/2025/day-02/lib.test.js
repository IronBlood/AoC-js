import { describe, it, expect } from '@jest/globals';
import {
	sum_invalids_by_range1,
	sum_invalids_by_range2,
	sum_invalid_ids,
} from "./lib.js";

describe("2025-12-01 p1_ut_sum_invalids_by_range", () => {
	/** @type {[string, number][]} */
	const testcases = [
		["11-22", 33],
		["95-115", 99],
		["998-1012", 1010],
		["1188511880-1188511890", 1188511885],
		["222220-222224", 222222],
		["1698522-1698528", 0],
		["446443-446449", 446446],
		["38593856-38593862", 38593859],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_invalids_by_range1(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2025-12-02 p2_ut_sum_invalis_by_range", () => {
	/** @type {[string, number][]} */
	const testcases = [
		["11-22", 33],
		["95-115", 99 + 111],
		["998-1012", 999 + 1010],
		["1188511880-1188511890", 1188511885],
		["222220-222224", 222222],
		["1698522-1698528", 0],
		["446443-446449", 446446],
		["38593856-38593862", 38593859],
		["565653-565659", 565656],
		["824824821-824824827", 824824824],
		["2121212118-2121212124", 2121212121],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_invalids_by_range2(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2025-12-02", () => {
	/** @type {[string, number, number][]} */
	const testcases = [
		[
			[
				"11-22,95-115,998-1012,1188511880-1188511890,222220-222224,",
				"1698522-1698528,446443-446449,38593856-38593862,565653-565659,",
				"824824821-824824827,2121212118-2121212124",
			].join(""),
			1227775554,
			4174379265,
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_invalid_ids(tc[0])).toBe(tc[1]);
			expect(sum_invalid_ids(tc[0], 2)).toBe(tc[2]);
		});
	}
});
