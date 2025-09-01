import { describe, it, expect } from '@jest/globals';
import {
	is_nice,
	is_nice2,
} from "./lib.js";

describe("2015-12-05 p1", () => {
	const testcases = [
		["ugknbfddgicrmopn", 1],
		["aaa", 1],
		["jchzalrnumimnmhp", 0],
		["haegwjzuvuyypxyu", 0],
		["dvszwmarrgswjxmb", 0],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_nice(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2015-12-05 p2", () => {
	const testcases = [
		["qjhvhtzxzqqjkmpb", 1],
		["xxyxx", 1],
		["uurcxstgmygtbstg", 0],
		["ieodomkazucvgmuy", 0],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_nice2(tc[0])).toBe(tc[1]);
		})
	}
});

