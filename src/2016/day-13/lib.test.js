import {
	shortest_steps,
	count_locations,
} from "./lib.js";

describe("2016-12-13 p1", () => {
	const testcases = [
		[`10`, [7,4], 11],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(shortest_steps(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

describe("2016-12-13 p2", () => {
	const testcases = [
		[`10`, 0, 1],
		[`10`, 1, 3],
		[`10`, 2, 5],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_locations(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

