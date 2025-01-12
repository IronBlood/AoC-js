import {
	checksum,
} from "./lib.js";

describe("2017-12-02 p1", () => {
	const testcases = [
		[`5 1 9 5
7 5 3
2 4 6 8`, 18],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(checksum(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2017-12-02 p2", () => {
	const testcases = [
		[`5 9 2 8
9 4 7 3
3 8 6 5`, 9],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(checksum(tc[0], 2)).toBe(tc[1]);
		})
	}
});

