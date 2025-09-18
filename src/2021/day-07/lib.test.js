import { describe, it, expect } from '@jest/globals';
import {
	min_fuel,
	min_fuel2,
} from "./lib.js";

describe("2021-12-07 p1", () => {
	const testcases = [
		[`16,1,2,0,4,2,7,1,2,14`, 37, 168],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(min_fuel(tc[0])).toBe(tc[1]);
			expect(min_fuel2(tc[0])).toBe(tc[2]);
		});
	}
});
