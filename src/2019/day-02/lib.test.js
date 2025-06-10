import { describe, it, expect } from '@jest/globals';
import {
	get_pos0,
} from "./lib.js";

describe("2019-12-02 p1", () => {
	const testcases = [
		["1,9,10,3,2,3,11,0,99,30,40,50", 3500],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_pos0(tc[0])).toBe(tc[1]);
		});
	}
});
