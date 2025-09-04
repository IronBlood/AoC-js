import { describe, it, expect } from '@jest/globals';
import {
	get_distance,
	get_distance_2,
} from "./lib.js";

describe("2020-12-12", () => {
	const testcases = [
		[`F10
N3
F7
R90
F11`, 25, 286],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_distance(tc[0])).toBe(tc[1]);
			expect(get_distance_2(tc[0])).toBe(tc[2]);
		});
	}
});
