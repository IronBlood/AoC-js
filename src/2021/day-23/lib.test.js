import { describe, it, expect } from '@jest/globals';
import {
	least_energy,
} from "./lib.js";

describe("2023-12-23", () => {
	const testcases = [
		[
			[
				"#############",
				"#...........#",
				"###B#C#B#D###",
				"  #A#D#C#A#",
				"  #########",
			].join("\n"),
			12521,
			44169,
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(least_energy(tc[0])).toBe(tc[1]);
			expect(least_energy(tc[0], 2)).toBe(tc[2]);
		});
	}
});
