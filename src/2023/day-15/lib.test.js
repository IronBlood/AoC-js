import { describe, it, expect } from '@jest/globals';
import {
	hash,
	sum_hash,
	focusing_power,
} from "./lib.js";

describe("2023-12-15 p1-ut_hash", () => {
	const testcases = [
		[`HASH`, 52],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(hash(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2023-12-15", () => {
	const testcases = [
		[`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`, 1320, 145],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_hash(tc[0])).toBe(tc[1]);
			expect(focusing_power(tc[0])).toBe(tc[2]);
		});
	}
});
