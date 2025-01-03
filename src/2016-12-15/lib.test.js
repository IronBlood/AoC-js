import {
	first_time,
} from "./lib.js";

describe("2016-12-15", () => {
	const testcases = [
		[`Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`, 5],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(first_time(tc[0])).toBe(tc[1]);
		})
	}
});

