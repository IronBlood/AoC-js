import {
	lowest_ip,
} from "./lib.js";

describe("2016-12-20 p1", () => {
	const testcases = [
		[`5-8
0-2
4-7`, 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(lowest_ip(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-20 p2", () => {
	const testcases = [
		[`5-8
0-2
4-7`, 2],
		[`5-8
1-2
4-7`, 3],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(lowest_ip(tc[0], 2, 10)).toBe(tc[1]);
		})
	}
});

