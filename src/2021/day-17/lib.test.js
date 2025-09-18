import { describe, it, expect } from '@jest/globals';
import {
	get_highest_y_pos,
	count_pairs,
} from "./lib.js";

describe("2021-12-17", () => {
	const testcases = [
		[`target area: x=20..30, y=-10..-5`, 45, 112],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_highest_y_pos(tc[0])).toBe(tc[1]);
			expect(count_pairs(tc[0])).toBe(tc[2]);
		});
	}
});
