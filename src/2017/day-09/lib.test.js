import { describe, it, expect } from '@jest/globals';
import {
	evaluate,
} from "./lib.js";

describe("2017-12-09 p1", () => {
	const testcases = [
		[`{}`, 1],
		[`{{{}}}`, 6],
		[`{{},{}}`, 5],
		[`{{{},{},{{}}}}`, 16],
		[`{<a>,<a>,<a>,<a>}`, 1],
		[`{{<ab>},{<ab>},{<ab>},{<ab>}}`, 9],
		[`{{<!!>},{<!!>},{<!!>},{<!!>}}`, 9],
		[`{{<a!>},{<a!>},{<a!>},{<ab>}}`, 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(evaluate(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-09 p2", () => {
	const testcases = [
		[`<>`, 0],
		[`<random characters>`, 17],
		[`<<<<>`, 3],
		[`<{!>}>`, 2],
		[`<!!>`, 0],
		[`<!!!>>`, 0],
		[`<{o"i!a,<{i<a>`, 10],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(evaluate(tc[0], 2)).toBe(tc[1]);
		})
	}
});

