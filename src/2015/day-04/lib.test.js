import { describe, it, expect } from '@jest/globals';
import {
	mine_coin
} from "./lib.js";

const should_skip = !!process.env.SKIP_MD5;

(should_skip ? describe.skip : describe)("2015-12-04", () => {
	const testcases = [
		["abcdef", 609043],
		["pqrstuv", 1048970],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(mine_coin(tc[0])).toBe(tc[1]);
		})
	}
});

