import { describe, it, expect } from '@jest/globals';
import {
	least_heat_loss,
} from "./lib.js";

describe("2023-12-17 p1", () => {
	const testcases = [
		[`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`, 102],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(least_heat_loss(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2023-12-17 p2", () => {
	const testcases = [
		[`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`, 94],
		[`111111111111
999999999991
999999999991
999999999991
999999999991`, 71],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(least_heat_loss(tc[0], 4, 10)).toBe(tc[1]);
		});
	}
});
