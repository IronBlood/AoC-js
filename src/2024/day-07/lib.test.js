import {
	is_valid,
	is_valid_2,
	total_calibration,
} from "./lib.js";

describe("2024-12-07", () => {
	const testcases = [
		[`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`, 3749],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_calibration(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-07 p1-is_valid", () => {
	const testcases = [
		[292, [11, 6, 16, 20], true],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_valid(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

describe("2024-12-07 p2-is_valid_2", () => {
	const testcases = [
		[156, [15, 6], true],
		[7290, [6, 8, 6, 15], true],
		[192, [17, 8, 14], true],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_valid_2(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

