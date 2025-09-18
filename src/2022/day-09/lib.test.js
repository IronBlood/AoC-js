import { describe, it, expect } from '@jest/globals';
import {
	count_tail_positions,
} from "./lib.js";

describe("2022-12-09 p1", () => {
	const testcases = [
		[`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`, 13],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_tail_positions(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2022-12-09 p2", () => {
	const testcases = [
		[`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`, 1],
		[`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`, 36],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_tail_positions(tc[0], 2)).toBe(tc[1]);
		});
	}
});
