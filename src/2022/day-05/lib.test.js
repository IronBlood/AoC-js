import { describe, it, expect } from '@jest/globals';
import {
	get_top_crates,
} from "./lib.js";

describe("2022-12-05 p1", () => {
	const testcases = [
		[`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`, "CMZ", "MCD"],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_top_crates(tc[0])).toBe(tc[1]);
			expect(get_top_crates(tc[0], 2)).toBe(tc[2]);
		});
	}
});
