import {
	count_tiles,
} from "./lib.js";

describe("2018-12-17 p1", () => {
	const testcases = [
		[`x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`, 57, 29],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const {tot, wat} = count_tiles(tc[0]);
			expect(tot).toBe(tc[1]);
			expect(wat).toBe(tc[2]);
		})
	}
});

