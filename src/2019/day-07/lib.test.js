import { describe, it, expect } from '@jest/globals';
import {
	get_seqs,
	get_highest_signal,
	get_highest_signal2,
} from "./lib.js";

describe("2019-12-07 p1_ut-seq", () => {
	const testcases = [
		[ 2, 0, [ "0,1", "1,0" ]],
		[ 2, 1, [ "2,1", "1,2" ]],
		[ 3, 0, [ "0,1,2", "0,2,1", "1,0,2", "1,2,0", "2,0,1", "2,1,0" ]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const seqs = get_seqs(tc[0], tc[1]).map(seq => seq.join(","));
			expect(seqs.sort()).toStrictEqual(tc[2].sort());
		});
	}
});

describe("2019-12-07 p1", () => {
	const testcases = [
		["3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", 43210],
		["3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0", 54321],
		["3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0", 65210],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_highest_signal(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2019-12-07 p2", () => {
	const testcases = [
		[`3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`, 139629729],
		[`3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`, 18216],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_highest_signal2(tc[0])).toBe(tc[1]);
		});
	}
});
