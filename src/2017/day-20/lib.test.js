import {
	closest_particle,
	count_left,
} from "./lib.js";

describe("2017-12-20 p1", () => {
	const testcases = [
		[`p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`, 0],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(closest_particle(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-20 p2", () => {
	const testcases = [
		[`p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>`, 1],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_left(tc[0])).toBe(tc[1]);
		})
	}
});

