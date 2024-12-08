import {
	can_form_a_triangle,
} from "./lib.js";

describe("2016-12-03 p1", () => {
	const testcases = [
		[[5, 10, 25], 0],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(can_form_a_triangle(tc[0])).toBe(tc[1]);
		})
	}
});

