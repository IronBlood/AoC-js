import { describe, it, expect } from '@jest/globals';
import {
	exec,
	exec2,
} from "./lib.js";

describe("2017-12-18 p1", () => {
	const testcases = [
		[`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`, 4],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(exec(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-18 p2", () => {
	const testcases = [
		[`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`, 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(exec2(tc[0])).toBe(tc[1]);
		})
	}
});

