import { describe, it, expect } from '@jest/globals';
import {
	multiply,
	multiply_3,
} from "./lib.js";

describe("2020-12-01 p1", () => {
	const testcases = [
		[`1721
979
366
299
675
1456`, 514579],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(multiply(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-01 p2", () => {
	const testcases = [
		[`1721
979
366
299
675
1456`, 241861950],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(multiply_3(tc[0])).toBe(tc[1]);
		});
	}
});
