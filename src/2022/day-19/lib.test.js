import { describe, it, expect } from '@jest/globals';
import {
	sum_quality_levels,
} from "./lib.js";

describe("2022-12-19", () => {
	const testcases = [
		[
			[
				[
					"Blueprint 1:",
					"Each ore robot costs 4 ore.",
					"Each clay robot costs 2 ore.",
					"Each obsidian robot costs 3 ore and 14 clay.",
					"Each geode robot costs 2 ore and 7 obsidian.",
				].join(" "),
				[
					"Blueprint 2:",
					"Each ore robot costs 2 ore.",
					"Each clay robot costs 3 ore.",
					"Each obsidian robot costs 3 ore and 8 clay.",
					"Each geode robot costs 3 ore and 12 obsidian."
				].join(" "),
			].join("\n"),
			33,
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_quality_levels(tc[0])).toBe(tc[1]);
		});
	}
});
