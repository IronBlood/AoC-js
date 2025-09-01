import { describe, it, expect } from '@jest/globals';
import {
	min_complexities,
} from "./lib.js";

describe("2024-12-21 p1", () => {
	const testcases = [
		[`029A
980A
179A
456A
379A`, 126384],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(min_complexities(tc[0])).toBe(tc[1]);
		})
	}
});

