import { describe, it, expect } from '@jest/globals';
import {
	least_mana,
} from "./lib.js";

describe("2015-12-22 p1", () => {
	const testcases = [
		[{ hp: 10, mana: 250 }, { hp: 13, damage: 8 }, 226],
		[{ hp: 10, mana: 250 }, { hp: 14, damage: 8 }, 641],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(least_mana(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

