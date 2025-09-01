import { describe, it, expect } from '@jest/globals';
import {
	count_steps,
} from "./lib.js";

describe("2017-12-11 p1", () => {
	const testcases = [
		[`ne,ne,ne`, 3],
		[`ne,ne,sw,sw`, 0],
		[`ne,ne,s,s`, 2],
		[`se,sw,se,sw,sw`, 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_steps(tc[0])).toBe(tc[1]);
		})
	}
});

