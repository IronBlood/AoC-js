import { describe, it, expect } from '@jest/globals';
import {
	parse_and_calc,
	parse_and_calc_with_flags,
} from "./lib.js";

describe("2024-12-03 p1", () => {
	it("test-0", () => {
		expect(parse_and_calc("xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))")).toBe(161);
	});
});

describe("2024-12-03 p2", () => {
	it("test-0", () => {
		expect(parse_and_calc_with_flags("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")).toBe(48);
	});
});

