import {
	find_pw,
} from "./lib.js";

describe("2016-12-05", () => {
	const testcases = [
		["abc", "18f47a30"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_pw(tc[0])).toBe(tc[1]);
		})
	}
});

