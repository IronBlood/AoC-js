import {
	sum_scores,
	sum_ratings,
} from "./lib.js";

describe("2024-12-10 p1", () => {
	const testcases = [
		[`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`, 36],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_scores(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-10 p2", () => {
	const testcases = [
		[`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`, 81],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_ratings(tc[0])).toBe(tc[1]);
		})
	}
});

