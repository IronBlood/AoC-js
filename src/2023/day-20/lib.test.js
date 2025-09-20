import { describe, it, expect } from '@jest/globals';
import {
	count_pulses,
} from "./lib.js";

describe("2023-12-20 p1", () => {
	const testcases = [
		[`broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`, 1, 32],
		[`broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`, 1000, 32000000],
		[`broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`, 1000, 11687500],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_pulses(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});
