import {
	build_bridge,
} from "./lib.js";

describe("2017-12-24 p1", () => {
	const testcases = [
		[`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`, 31],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(build_bridge(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-24 p2", () => {
	const testcases = [
		[`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`, 19],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(build_bridge(tc[0], 2)).toBe(tc[1]);
		})
	}
});

