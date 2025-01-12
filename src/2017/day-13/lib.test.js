import {
	get_severity,
	get_delays,
} from "./lib.js";

describe("2017-12-13 p1", () => {
	const testcases = [
		[`0: 3
1: 2
4: 4
6: 4`, 24],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_severity(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-13 p2", () => {
	const testcases = [
		[`0: 3
1: 2
4: 4
6: 4`, 10],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_delays(tc[0])).toBe(tc[1]);
		})
	}
});

