import { describe, it, expect } from '@jest/globals';
import {
	possible_molecules,
} from "./lib.js";

describe("2015-12-19 p1", () => {
	const testcases = [
		[`H => HO
H => OH
O => HH

HOH`, 4],
		[`H => HO
H => OH
O => HH

HOHOHO`, 7],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(possible_molecules(tc[0])).toBe(tc[1]);
		})
	}
});

