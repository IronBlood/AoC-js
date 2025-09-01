import { describe, it, expect } from '@jest/globals';
import {
	get_checksum,
	hash,
	hex_nums,
	get_dense_hash,
} from "./lib.js";

describe("2017-12-10 p1", () => {
	const testcases = [
		[`3,4,1,5`, 12],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_checksum(tc[0], 5)).toBe(tc[1]);
		})
	}
});

describe("2017-12-10 p2", () => {
	const testcases = [
		["",         "a2582a3a0e66e6e86e3812dcb672a272"],
		["AoC 2017", "33efeb34ea91902bb2f59c9920caa6cd"],
		["1,2,3",    "3efbe78a8d82f29979031a4aa0b16a9d"],
		["1,2,4",    "63960835bcdc130f0b66d7ff4f6a5a8e"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(hash(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-10 p2_ut-hex", () => {
	const testcases = [
		[[64,7,255], "4007ff"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(hex_nums(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-10 p2_ut-dense", () => {
	const testcases = [
		[[65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22], [64]],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_dense_hash(tc[0])).toStrictEqual(tc[1]);
		})
	}
});

