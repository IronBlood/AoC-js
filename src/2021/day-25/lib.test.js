import { describe, it, expect } from '@jest/globals';
import {
	no_move,
} from "./lib.js";

describe("2021-12-25", () => {
	const testcases = [
		[`v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`, 58],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(no_move(tc[0])).toBe(tc[1]);
		});
	}
});
