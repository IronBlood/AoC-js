import { describe, it, expect } from '@jest/globals';
import {
	exec,
} from "./lib.js";

describe("2016-12-23 p1", () => {
	const testcases = [
		[`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`, 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(exec(tc[0])).toBe(tc[1]);
		})
	}
});

