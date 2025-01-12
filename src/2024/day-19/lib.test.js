import {
	possible_patterns,
	total_ways,
} from "./lib.js";

describe("2024-12-19 p1", () => {
	const testcases = [
		[`r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`, 6],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(possible_patterns(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-19 p1", () => {
	const testcases = [
		[`r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`, 16],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_ways(tc[0])).toBe(tc[1]);
		})
	}
});

