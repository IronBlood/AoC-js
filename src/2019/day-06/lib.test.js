import { describe, it, expect } from '@jest/globals';
import {
	total_orbits,
	min_transfer,
} from "./lib.js";

describe("2019-12-06 p1", () => {
	const testcases = [
		[`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`, 42],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_orbits(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2019-12-06 p2", () => {
	const testcases = [
		[`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`, 4],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(min_transfer(tc[0])).toBe(tc[1]);
		});
	}
});
