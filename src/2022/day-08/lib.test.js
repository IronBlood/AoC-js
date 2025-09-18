import { describe, it, expect } from '@jest/globals';
import {
	count_visible_trees,
	highest_scenic_score,
} from "./lib.js";

describe("2022-12-08", () => {
	const testcases = [
		[`30373
25512
65332
33549
35390`, 21, 8,],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_visible_trees(tc[0])).toBe(tc[1]);
			expect(highest_scenic_score(tc[0])).toBe(tc[2]);
		});
	}
});
