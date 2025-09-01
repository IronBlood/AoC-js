import { describe, it, expect } from '@jest/globals';
import {
	get_reg0,
} from "./lib.js";

describe("2018-12-19 p1", () => {
	const testcases = [
		[`#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`, 7],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_reg0(tc[0])).toBe(tc[1]);
		})
	}
});

