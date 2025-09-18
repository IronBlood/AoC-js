import { describe, it, expect } from '@jest/globals';
import {
	get_snafu_number,
	snafu_to_decimal,
	decimal_to_snafu,
} from "./lib.js";

describe("2022-12-25 ut-snafu_to_decimal", () => {
	const testcases = [
		["1", 1],
		["2", 2],
		["1=", 3],
		["1-", 4],
		["10", 5],
		["1121-1110-1=0", 314159265],
		["1=-0-2", 1747],
		["12111", 906],
		["2=0=", 198],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(snafu_to_decimal(tc[0])).toBe(tc[1]);
			expect(decimal_to_snafu(tc[1])).toBe(tc[0]);
		});
	}
});

describe("2022-12-25", () => {
	const testcases = [
		[`1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`, "2=-1=0"],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_snafu_number(tc[0])).toBe(tc[1]);
		});
	}
});
