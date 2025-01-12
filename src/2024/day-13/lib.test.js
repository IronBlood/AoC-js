import {
	minimum_token,
} from "./lib.js";

describe("2024-12-13 p1", () => {
	const testcases = [
		[`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`, 480],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(minimum_token(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-13 p2", () => {
	const testcases = [
		[`Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176`, 459236326669],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(minimum_token(tc[0], 2)).toBe(tc[1]);
		})
	}
});

