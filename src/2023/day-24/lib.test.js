import { describe, it, expect } from '@jest/globals';
import {
	count_intersections,
} from "./lib.js";

describe("2023-12-24 p1", () => {
	const testcases = [
		[`19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`, 7, 27, 2],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_intersections(tc[0], tc[1], tc[2])).toBe(tc[3]);
		});
	}
});
