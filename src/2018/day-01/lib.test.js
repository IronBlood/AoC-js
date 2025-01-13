import {
	get_freq,
} from "./lib.js";

describe("2018-12-01 p1", () => {
	const testcases = [
		["+1\n+1\n+1", 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_freq(tc[0])).toBe(tc[1]);
		})
	}
});

