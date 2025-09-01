import { describe, it, expect } from '@jest/globals';
import {
	minimum_moves,
} from "./lib.js";

describe("2016-12-11", () => {
	const testcases = [
		[`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`, 11],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(minimum_moves(tc[0])).toBe(tc[1]);
		})
	}
});

