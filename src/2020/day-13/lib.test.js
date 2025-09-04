import { describe, it, expect } from '@jest/globals';
import {
	min_waiting,
	earliest_timestamp,
} from "./lib.js";

describe("2020-12-13 p1", () => {
	const testcases = [
		[`939
7,13,x,x,59,x,31,19`, 295],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(min_waiting(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-13 p2", () => {
	const testcases = [
		[`7,13,x,x,59,x,31,19`, 1068781],
		[`17,x,13,19`, 3417],
		[`67,7,59,61`, 754018],
		[`67,x,7,59,61`, 779210],
		[`67,7,x,59,61`, 1261476],
		[`1789,37,47,1889`, 1202161486],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(earliest_timestamp(tc[0])).toBe(tc[1]);
		});
	}
});
