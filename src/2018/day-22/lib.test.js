import {
	total_risk,
	fewest_minutes,
} from "./lib.js";

describe("2018-12-22", () => {
	const testcases = [
		["depth: 510\ntarget: 10,10", 114, 45],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_risk(tc[0])).toBe(tc[1]);
			expect(fewest_minutes(tc[0])).toBe(tc[2]);
		});
	}
});
