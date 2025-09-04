import { describe, it, expect } from '@jest/globals';
import {
	get_label,
} from "./lib.js";

describe("2020-12-23 p1", () => {
	const testcases = [
		["389125467", 10, 1, 92658374],
		["389125467", 100, 1, 67384529],
		["389125467", 10000000, 2, 149245887792],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_label(tc[0], tc[1], tc[2])).toBe(tc[3]);
		});
	}
});
