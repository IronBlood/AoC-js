import { describe, it, expect } from '@jest/globals';
import {
	grand_total,
	grand_total2
} from "./lib.js";

describe("2025-12-06", () => {
	/** @type {[string, number, number][]} */
	const testcases = [
		[
			[
				"123 328  51 64 ",
				" 45 64  387 23 ",
				"  6 98  215 314",
				"*   +   *   +  ",
			].join("\n"),
			4277556,
			3263827
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(grand_total(tc[0])).toBe(tc[1]);
			expect(grand_total2(tc[0])).toBe(tc[2]);
		});
	}
});
