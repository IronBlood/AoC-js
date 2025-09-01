import { describe, it, expect } from '@jest/globals';
import {
	total_price,
	total_price_2,
} from "./lib.js";

describe("2024-12-12 p1", () => {
	const testcases = [
		[`AAAA
BBCD
BBCC
EEEC`, 140],
		[`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`, 772],
		[`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`, 1930],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_price(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-12 p2", () => {
	const testcases = [
		[`AAAA
BBCD
BBCC
EEEC`, 80],
		[`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`, 436],
		[`EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`, 236],
		[`AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`, 368],
		[`GGG`, 12],
		["KK\nKK", 16],
		["VVV\nVNN", 32],
		[`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`, 1206],
		[`BBBB
BABB
BBAB
BBBB`, 176],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_price_2(tc[0], 2)).toBe(tc[1]);
		})
	}
});

