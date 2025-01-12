import {
	after_dance,
} from "./lib.js";

describe("2017-12-16 p1", () => {
	const testcases = [
		[`s1,x3/4,pe/b`, "abcde", "baedc"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(after_dance(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

