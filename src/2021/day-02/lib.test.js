import { describe, it, expect } from '@jest/globals';
import {
	get_pos,
	get_pos2,
} from "./lib.js";

describe("2021-12-02", () => {
	const testcases = [
		[`forward 5
down 5
forward 8
up 3
down 8
forward 2`, 150, 900],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_pos(tc[0])).toBe(tc[1]);
			expect(get_pos2(tc[0], 2)).toBe(tc[2]);
		});
	}
});
