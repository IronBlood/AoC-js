import {
	compact_and_get_checksum1,
	compact_and_get_checksum2,
} from "./lib.js";

describe("2024-12-09 p1", () => {
	const testcases = [
		["2333133121414131402", 1928],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(compact_and_get_checksum1(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-09 p2", () => {
	const testcases = [
		["2333133121414131402", 2858],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(compact_and_get_checksum2(tc[0])).toBe(tc[1]);
		})
	}
});

