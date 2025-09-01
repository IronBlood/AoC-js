import { describe, it, expect } from '@jest/globals';
import {
	all_pots,
} from "./lib.js";

describe("2018-12-12 p1", () => {
	const testcases = [
		[`initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`, 325],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(all_pots(tc[0])).toBe(tc[1]);
		})
	}
});

