import { describe, it, expect } from '@jest/globals';
import {
	get_acc,
} from "./lib.js";

describe("2020-12-08 p1", () => {
	const testcases = [
		[`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`, 5],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_acc(tc[0])).toBe(tc[1]);
		});
	}
});
