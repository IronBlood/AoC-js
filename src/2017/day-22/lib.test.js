import { describe, it, expect } from '@jest/globals';
import {
	count_infection,
	count_infection2,
} from "./lib.js";

describe("2017-12-22 p1", () => {
	const data = `..#
#..
...`;

	const testcases = [
		[1, 1],
		[2, 1],
		[7, 5],
		[10000, 5587],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_infection(data, tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-22 p2", () => {
	const data = `..#
#..
...`;

	const testcases = [
		[100, 26],
		[10000000, 2511944],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_infection2(data, tc[0])).toBe(tc[1]);
		})
	}
});

