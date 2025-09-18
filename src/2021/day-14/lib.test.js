import { describe, it, expect } from '@jest/globals';
import {
	get_substraction,
} from "./lib.js";

describe("2021-12-14", () => {
	const testcases = [
		[`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`, 1588, 2188189693529],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_substraction(tc[0])).toBe(tc[1]);
			expect(get_substraction(tc[0], 40)).toBe(tc[2]);
		});
	}
});
