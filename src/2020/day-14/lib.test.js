import { describe, it, expect } from '@jest/globals';
import {
	get_sum,
	get_sum2,
} from "./lib.js";

describe("2020-12-14 p1", () => {
	const testcases = [
		[`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`, 165n],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_sum(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-14 p2", () => {
	const testcases = [
		[`mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`, 208],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_sum2(tc[0])).toBe(tc[1]);
		});
	}
});
