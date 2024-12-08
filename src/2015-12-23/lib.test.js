import {
	sim,
} from "./lib.js";

describe("2015-12-23 p1", () => {
	const testcases = [
		[`inc a
jio a, +2
tpl a
inc a`, 0, 2],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sim(tc[0])[tc[1]]).toBe(tc[2]);
		})
	}
});

