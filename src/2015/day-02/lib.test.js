import { describe, it, expect } from '@jest/globals';
import {
	total_ribbon,
	total_square,
} from "./lib.js";

describe("2015-12-02", () => {
	const testcases = [
		["2x3x4",58,34],
		["1x1x10",43,14],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_square(tc[0])).toBe(tc[1]);
			expect(total_ribbon(tc[0])).toBe(tc[2]);
		})
	}
});

