import { describe, it, expect } from '@jest/globals';
import {
	sum_counts,
} from "./lib.js";

describe("2020-12-06 p1", () => {
	const testcases = [
		[`abc

a
b
c

ab
ac

a
a
a
a

b`, 11],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_counts(tc[0])).toBe(tc[1]);
		});
	}
});
