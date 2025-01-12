import {
	is_safe,
	is_safe2,
} from "./lib.js";

describe("2024-12-02 p1", () => {
	const testcases = [
		["7 6 4 2 1", true, true],
		["1 2 7 8 9", false, false],
		["1 3 6 7 9", true, true],
		["8 6 4 4 1", false, true],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_safe(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-02 p2", () => {
	const testcases = [
		["7 6 4 2 1", true],
		["1 2 7 8 9", false],
		["1 3 6 7 9", true],
		["8 6 4 4 1", true],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_safe2(tc[0])).toBe(tc[1]);
		})
	}
});

