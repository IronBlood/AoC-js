import {
	total_number,
	shortest_distance,
} from "./lib.js";

describe("2018-12-23 p1", () => {
	const testcases = [
		[ `pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`, 7],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_number(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2018-12-23 p2", () => {
	const testcases = [
		[`pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`, 36],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(shortest_distance(tc[0])).toBe(tc[1]);
		});
	}
});
