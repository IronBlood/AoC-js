import { describe, it, expect } from '@jest/globals';
import {
	first_eight_digit,
	generate_transform,
	get_msg,
} from "./lib.js";

describe("2019-12-16 p1-ut_transform", () => {
	const testcases = [
		[ 8, 2, [0, 1, 1, 0, 0, -1, -1, 0]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const transform = generate_transform(tc[0], tc[1]);
			expect(transform.length).toBe(tc[0]);
			expect(transform).toStrictEqual(tc[2]);
		});
	}
});

describe("2019-12-16 p1", () => {
	const testcases = [
		[ "12345678", 1, "48226158" ],
		[ "12345678", 2, "34040438" ],
		[ "12345678", 3, "03415518" ],
		[ "12345678", 4, "01029498" ],
		[ "80871224585914546619083218645595", 100, "24176176" ],
		[ "19617804207202209144916044189917", 100, "73745418" ],
		[ "69317163492948606335995924319873", 100, "52432133" ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(first_eight_digit(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});

describe("2019-12-16 p2", () => {
	const testcases = [
		[ "03036732577212944063491565474664", "84462026" ],
		[ "02935109699940807407585447034323", "78725270" ],
		[ "03081770884921959731165446850517", "53553731" ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_msg(tc[0])).toBe(tc[1]);
		});
	}
});
