import {
	count_blocks,
	count_blocks_HQ,
} from "./lib.js";

describe("2016-12-01 p1", () => {
	const testcases = [
		["R2, L3", 5],
		["R2, R2, R2", 2],
		["R5, L5, R5, R3", 12],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_blocks(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-01 p2", () => {
	const testcases = [
		["R8, R4, R4, R8", 4],
		["R2, R3, R2, R3", 0],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_blocks_HQ(tc[0])).toBe(tc[1]);
		})
	}
});

