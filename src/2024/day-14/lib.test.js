import {
	safety_factor,
} from "./lib.js";

describe("2024-12-14", () => {
	const testcases = [
		[`p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`, { x: 11, y: 7 }, 12],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(safety_factor(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

