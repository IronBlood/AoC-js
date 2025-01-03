import {
	farthest,
	most_points,
} from "./lib.js";

const data = [
	"Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.",
	"Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
];

describe("2015-12-14 p1", () => {
	const testcases = [
		[1, 16],
		[10, 160],
		[11, 176],
		[12, 176],
		[1000, 1120],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(farthest(data, tc[0])).toBe(tc[1]);
		})
	}
});

describe("2015-12-14 p2", () => {
	const testcases = [
		[1, 1],
		[140, 139],
		[1000, 689],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(most_points(data, tc[0])).toBe(tc[1]);
		})
	}
});

