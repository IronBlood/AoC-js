import { describe, it, expect } from '@jest/globals';
import {
	count_connected,
	count_groups,
} from "./lib.js";

describe("2017-12-12 p1", () => {
	const testcases = [
		[`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`, 6],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_connected(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-12 p2", () => {
	const testcases = [
		[`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`, 2],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_groups(tc[0])).toBe(tc[1]);
		})
	}
});

