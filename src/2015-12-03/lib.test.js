import {
	count_houses,
	count_houses_with_robo,
} from "./lib.js";

describe("2015-12-03 p1", () => {
	const testcases = [
		[">", 2],
		["^>v<", 4],
		["^v^v^v^v^v", 2],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_houses(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2015-12-03 p2", () => {
	const testcases = [
		["^v", 3],
		["^>v<", 3],
		["^v^v^v^v^v", 11],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_houses_with_robo(tc[0])).toBe(tc[1]);
		})
	}
});

