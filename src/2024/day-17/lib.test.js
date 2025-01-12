import {
	sim_8bit_computer,
	find_a,
} from "./lib.js";

describe("2024-12-17 p1", () => {
	const testcases = [
		[`Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`, "4,6,3,5,6,3,5,2,1,0",],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sim_8bit_computer(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-17 p2", () => {
	const testcases = [
		[`Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`, 117440],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_a(tc[0])).toBe(tc[1]);
		})
	}
});

