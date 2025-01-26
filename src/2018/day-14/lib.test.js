import {
	get_score,
	first_appear,
} from "./lib.js";

describe("2018-12-14 p1", () => {
	const testcases = [
		[9, "5158916779"],
		[5, "0124515891"],
		[18, "9251071085"],
		[2018, "5941429882"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_score(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-14 p2", () => {
	const testcases = [
		["51589", 9],
		["01245", 5],
		["92510", 18],
		["59414", 2018],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(first_appear(tc[0])).toBe(tc[1]);
		})
	}
});

