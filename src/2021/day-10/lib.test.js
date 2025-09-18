import { describe, it, expect } from '@jest/globals';
import {
	find_middle_score,
	find_score,
} from "./lib.js";

describe("2021-12-10 p1-ut_find_score", () => {
	const testcases = [
		[`{([(<{}[<>[]}>{[]{[(<()>`, 1197],
		[`[[<[([]))<([[{}[[()]]]`, 3],
		[`[{[{({}]{}}([{[{{{}}([]`, 57],
		[`[<(<(<(<{}))><([]([]()`, 3],
		[`<{([([[(<>()){}]>(<<{{`, 25137],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_score(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2021-12-10 p2", () => {
	const testcases = [
		[`[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
(((({<>}<{<{<>}{[]{[]{}
{<[[]]>}<{[{[{[]{()[[[]
<{([{{}}[<[[[<>{}]]]>[]]`, 288957],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_middle_score(tc[0])).toBe(tc[1]);
		});
	}
});
