import {
	support_ssl,
	support_tls,
} from "./lib.js";

describe("2016-12-07 p1", () => {
	const testcases = [
		["abba[mnop]qrst", 1],
		["abcd[bddb]xyyx", 0],
		["aaaa[qwer]tyui", 0],
		["ioxxoj[asdfgh]zxcvbn", 1],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(support_tls(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-07 p2", () => {
	const testcases = [
		["aba[bab]xyz", 1],
		["xyx[xyx]xyx", 0],
		["aaa[kek]eke", 1],
		["zazbz[bzb]cdb", 1],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(support_ssl(tc[0])).toBe(tc[1]);
		})
	}
});

