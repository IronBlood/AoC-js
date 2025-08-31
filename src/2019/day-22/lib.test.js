import { describe, it, expect } from '@jest/globals';
import {
	build_deck,
	find_x,
	transform,
} from "./lib.js";

describe("2019-12-22 p1-ut_transform", () => {
	const testcases = [
		[ build_deck(10), "deal into new stack", "9 8 7 6 5 4 3 2 1 0" ],
		[ build_deck(10), "cut 3", "3 4 5 6 7 8 9 0 1 2" ],
		[ build_deck(10), "cut -4", "6 7 8 9 0 1 2 3 4 5" ],
		[ build_deck(10), "deal with increment 3", "0 7 4 1 8 5 2 9 6 3" ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(transform(tc[0], tc[1]).join(" ")).toBe(tc[2]);
		});
	}
});

describe("2019-12-22 p2-ut_find_x", () => {
	const testcases = [
		{
			data: `deal with increment 7
deal into new stack
deal into new stack`,
			N: 10,
			target: 0,
			res: 0n,
		},
		{
			data: `cut 6
deal with increment 7
deal into new stack`,
			N: 10,
			target: 8,
			res: 5n,
		},
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const {
				data,
				N,
				target,
				res,
			} = testcases[i];
			expect(find_x(data, N, target)).toBe(res);
		});
	}
});
