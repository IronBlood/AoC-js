import { describe, it, expect } from '@jest/globals';
import {
	count_chars,
} from "./lib.js";

describe("2022-12-06", () => {
	const testcases = [
		["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7, 19],
		["bvwbjplbgvbhsrlpgdmjqwftvncz", 5, 23],
		["nppdvjthqldpwncqszvftbrmjlhg", 6, 23],
		["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10, 29],
		["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11, 26],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_chars(tc[0])).toBe(tc[1]);
			expect(count_chars(tc[0], 2)).toBe(tc[2]);
		});
	}
});
