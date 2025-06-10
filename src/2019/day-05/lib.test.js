import { describe, it, expect } from '@jest/globals';
import {
	get_diagnostic_code,
} from "./lib.js";

describe("2019-12-05 p2", () => {
	const testcases = [
		[`3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99`, 999],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_diagnostic_code(tc[0], 2)).toBe(tc[1]);
		});
	}
});
