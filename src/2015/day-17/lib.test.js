import {
	fill_containers,
	minimum,
} from "./lib.js";

describe("2015-12-17", () => {
	const testcases = [
		[[20,15,10,5,5], 25, 4, 2],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(fill_containers(tc[0], tc[1])).toBe(tc[2]);
			expect(minimum(tc[0], tc[1])).toBe(tc[3]);
		})
	}
});

