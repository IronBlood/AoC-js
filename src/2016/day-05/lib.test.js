import { describe, it, expect } from '@jest/globals';
import {
	find_pw,
} from "./lib.js";

const should_skip = !!process.env.SKIP_MD5;

(should_skip ? describe.skip : describe)("2016-12-05", () => {
	const testcases = [
		["abc", "18f47a30"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_pw(tc[0])).toBe(tc[1]);
		})
	}
});

