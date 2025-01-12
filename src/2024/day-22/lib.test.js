import {
	next_secret_num,
	sum_2000th,
	max_seq,
} from "./lib.js";

describe("2024-12-22 p1", () => {
	const testcases = [
		[`1
10
100
2024`, 37327623],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_2000th(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-22 p1 ut", () => {
	const testcases = [
		[123, 15887950],
		[15887950, 16495136],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(next_secret_num(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-22 p2 ut", () => {
	const testcases = [
		[`123`, 10, 6],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(max_seq(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

describe("2024-12-22 p2", () => {
	const testcases = [
		[`1
2
3
2024`, 23],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(max_seq(tc[0])).toBe(tc[1]);
		})
	}
});

