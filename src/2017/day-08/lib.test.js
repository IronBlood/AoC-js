import {
	exec,
} from "./lib.js";

describe("2017-12-08 p1", () => {
	const testcases = [
		[`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`, 1],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(exec(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-08 p2", () => {
	const testcases = [
		[`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`, 10],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(exec(tc[0], 2)).toBe(tc[1]);
		})
	}
});

