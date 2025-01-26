import {
	get_power_level,
	largest_total_power_pos,
	largest_total_power,
} from "./lib.js";

describe("2018-12-11 get_power_level", () => {
	const testcases = [
		[3, 5, 8, 4],
		[122, 79, 57, -5],
		[217, 196, 39, 0],
		[101, 153, 71, 4],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_power_level(tc[0], tc[1], tc[2])).toBe(tc[3]);
		})
	}
});

describe("2018-12-11 p1", () => {
	const testcases = [
		[18, "33,45"],
		[42, "21,61"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(largest_total_power_pos(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-11 p2", () => {
	const testcases = [
		[18, "90,269,16"],
		[42, "232,251,12"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(largest_total_power(tc[0])).toBe(tc[1]);
		})
	}
});

