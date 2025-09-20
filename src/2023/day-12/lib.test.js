import { describe, it, expect } from '@jest/globals';
import {
	count_arrangements,
	total_arrangements,
	solve_record_top,
	solve_record_bottom,
} from "./lib.js";

describe("2023-12-12 p1-ut_count_arrangements", () => {
	const testcases = [
		["???.### 1,1,3", 1],
		[".??..??...?##. 1,1,3", 4],
		["?#?#?#?#?#?#?#? 1,3,1,6", 1],
		["????.#...#... 4,1,1", 1],
		["????.######..#####. 1,6,5", 4],
		["?###???????? 3,2,1", 10],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_arrangements(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2023-12-12", () => {
	const testcases = [
		[`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`, 21, 525152],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_arrangements(tc[0])).toBe(tc[1]);
			expect(total_arrangements(tc[0], 2)).toBe(tc[2]);
		});
	}
});

describe("2023-12-12 p2-ut_count_arrangements", () => {
	const testcases = [
		["???.### 1,1,3", 1],
		[".??..??...?##. 1,1,3", 16384],
		["?#?#?#?#?#?#?#? 1,3,1,6", 1],
		["????.#...#... 4,1,1", 16],
		["????.######..#####. 1,6,5", 2500],
		["?###???????? 3,2,1", 506250],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(solve_record_top(tc[0])).toBe(tc[1]);
			expect(solve_record_bottom(tc[0])).toBe(tc[1]);
		});
	}
});
