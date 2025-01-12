import {
	get_letters,
} from "./lib.js";

describe("2017-12-19", () => {
	const testcases = [
		[[
			"     |          ",
			"     |  +--+    ",
			"     A  |  C    ",
			" F---|----E|--+ ",
			"     |  |  |  D ",
			"     +B-+  +--+ ",
		].join("\n"), "ABCDEF", 38],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_letters(tc[0])).toBe(tc[1]);
			expect(get_letters(tc[0], 2)).toBe(tc[2]);
		})
	}
});

