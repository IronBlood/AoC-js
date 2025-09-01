import { describe, it, expect } from '@jest/globals';
import {
	sum_numbers,
	sum_numbers_exclude_red,
} from "./lib.js";

describe("2015-12-12 p1", () => {
	const testcases = [
		[`[1,2,3]`, 6],
		[`{"a":2,"b":4}`, 6],
		[`{"a":{"b":4},"c":-1}`, 3],
		[`[]`, 0],
		[`{}`, 0],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_numbers(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2015-12-12 p2", () => {
	const testcases = [
		[`[1,2,3]`, 6],
		[`[1,{"c":"red","b":2},3]`, 4],
		[`{"d":"red","e":[1,2,3,4],"f":5}`, 0],
		[`[1,"red",5]`, 6],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_numbers_exclude_red(tc[0])).toBe(tc[1]);
		})
	}
});

