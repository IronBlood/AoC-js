import {
	fewest_steps,
} from "./lib.js";

describe("2016-12-24 p1", () => {
	const testcases = [
		[`###########
#0.1.....2#
#.#######.#
#4.......3#
###########`, 14],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(fewest_steps(tc[0])).toBe(tc[1]);
		})
	}
});

