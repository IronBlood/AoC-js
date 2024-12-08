import {
	look_and_say,
} from "./lib.js";

describe("2015-12-10 p1", () => {
	const testcases = [
		["1", "11"],
		["11", "21"],
		["21", "1211"],
		["1211", "111221"],
		["111221", "312211"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(look_and_say(tc[0])).toBe(tc[1]);
		})
	}
});

