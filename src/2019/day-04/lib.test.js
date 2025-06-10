import { describe, it, expect } from '@jest/globals';
import {
	valid_password,
	valid_password2,
} from "./lib.js";

describe("2019-12-04 p1", () => {
	const testcases = [
		[ 111111, 1 ],
		[ 223450, 0 ],
		[ 123789, 0 ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(valid_password(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2019-12-04 p2", () => {
	const testcases = [
		[ 112233, 1 ],
		[ 123444, 0 ],
		[ 111122, 1 ],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(valid_password2(tc[0])).toBe(tc[1]);
		});
	}
});
