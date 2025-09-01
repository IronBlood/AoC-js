import { describe, it, expect } from '@jest/globals';
import {
	scramble,
	unscramble,
} from "./lib.js";

describe("2016-12-21 p1", () => {
	const testcases = [
		[`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`, "abcde", "decab"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(scramble(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

describe("2016-12-21 p1-ut", () => {
	const testcases = [
		[`swap position 4 with position 0`, "abcde", "ebcda"],
		[`swap letter d with letter b`, "ebcda", "edcba"],
		[`reverse positions 0 through 4`, "edcba", "abcde"],
		[`rotate left 1 step`, "abcde", "bcdea"],
		[`move position 1 to position 4`, "bcdea", "bdeac"],
		[`move position 3 to position 0`, "bdeac", "abdec"],
		[`rotate based on position of letter b`, "abdec", "ecabd"],
		[`rotate based on position of letter d`, "ecabd", "decab"],
		[`rotate based on position of letter d`, "abdec", "decab"],
	];

	for (let i = 0; i < testcases.length; i++) {
		const tc = testcases[i];
		it(`test-${i}: ${tc[0]} ${tc[1]} -> ${tc[2]}`, () => {
			expect(scramble(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

describe("2016-12-21 p2-ut", () => {
	const testcases = [
		[`swap position 4 with position 0`, "abcde", "ebcda"],
		[`swap letter d with letter b`, "ebcda", "edcba"],
		[`reverse positions 0 through 4`, "edcba", "abcde"],
		[`rotate left 1 step`, "abcde", "bcdea"],
		[`move position 1 to position 4`, "bcdea", "bdeac"],
		[`move position 3 to position 0`, "bdeac", "abdec"],
		[`rotate based on position of letter b`, "abdec", "ecabd"],
		[`rotate based on position of letter d`, "ecabd", "decab"], // BUG
	];

	for (let i = 0; i < testcases.length; i++) {
		const tc = testcases[i];
		it(`test-${i}: ${tc[0]} ${tc[2]} -> ${tc[1]}`, () => {
			expect(unscramble(tc[0], tc[2])).toBe(tc[1]);
		})
	}
});

