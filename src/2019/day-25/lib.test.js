import { describe, it, expect } from '@jest/globals';
import {
	helper_remove_comments,
	helper_generate_combo,
} from "./helper.js";

describe("2019-12-25 ut-helper_remove_comments", () => {
	const testcases = [
		[`# foo\nmain`, `main`],
		[`# foo`, ""],
		[`line 1#foo`, "line 1"],
		[`line 1#\nline2 #1`, "line 1\nline2"],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(helper_remove_comments(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2019-12-25 ut-helper_generate_combo", () => {
	const testcases = [
		[ [1,2], [ [1], [2], [1,2] ]],
		[ [1,2,3], [ [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3] ]],
	];

	/**
	 * @param {number[][]} arr
	 */
	const format = (arr) => arr.map(y => y.join(",")).sort();

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const combos = helper_generate_combo(tc[0]);
			expect(format(combos)).toStrictEqual(format(tc[1]));
		});
	}
});
