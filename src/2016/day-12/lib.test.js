import { describe, it, expect } from '@jest/globals';
import {
	exec,
} from "./lib.js";

describe("2016-12-12", () => {
	const testcases = [
		[`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`, 42],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(exec(tc[0])).toBe(tc[1]);
		})
	}
});

