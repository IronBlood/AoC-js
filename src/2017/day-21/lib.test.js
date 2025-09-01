import { describe, it, expect } from '@jest/globals';
import {
	count_on,
} from "./lib.js";
import {
	rotate_tile,
} from "../../lib/matrix.js";

describe("2017-12-21 p1", () => {
	const testcases = [
		[`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`, 2, 12],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_on(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

describe("2017-12-21 ut-rotate_tile", () => {
	const testcases = [
		[[[1, 2]], 1, [[1], [2]]],
		[[[1, 2]], 2, [[2, 1]]],
		[[[1, 2]], 3, [[2], [1]]],
	];

	/**
	 * @param {string} str
	 */
	const split_str = str => str.split("\n").map(x => x.split(""));

	testcases.push([split_str("123\n456"), 1, split_str("41\n52\n63")]);
	testcases.push([split_str("123\n456"), 2, split_str("654\n321")]);
	testcases.push([split_str("123\n456"), 3, split_str("36\n25\n14")]);

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(rotate_tile(tc[0], tc[1])).toStrictEqual(tc[2]);
		})
	}
});

