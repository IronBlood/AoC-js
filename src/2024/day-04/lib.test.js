import {
	count_word,
	count_x,
} from "./lib.js";

describe("2024-12-04", () => {
	const testcases = [
		[`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`, 18, 9],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_word(tc[0], "XMAS")).toBe(tc[1]);
			expect(count_x(tc[0], "XMAS")).toBe(tc[2]);
		})
	}
});

