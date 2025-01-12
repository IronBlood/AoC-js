import {
	count_valid_passphrases,
} from "./lib.js";

describe("2017-12-04 p1", () => {
	const testcases = [
		["aa bb cc dd ee", 1],
		["aa bb cc dd aa", 0],
		["aa bb cc dd aaa", 1],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_valid_passphrases(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-04 p2", () => {
	const testcases = [
		["abcde fghij", 1],
		["abcde xyz ecdab", 0],
		["a ab abc abd abf abj", 1],
		["iiii oiii ooii oooi oooo", 1],
		["oiii ioii iioi iiio", 0],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_valid_passphrases(tc[0], 2)).toBe(tc[1]);
		})
	}
});

