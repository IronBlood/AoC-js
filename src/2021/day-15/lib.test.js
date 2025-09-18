import { describe, it, expect } from '@jest/globals';
import {
	lowest_total_risk,
} from "./lib.js";

describe("2021-12-15", () => {
	const testcases = [
		[`1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`, 40, 315],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(lowest_total_risk(tc[0])).toBe(tc[1]);
			expect(lowest_total_risk(tc[0], 2)).toBe(tc[2]);
		});
	}
});
