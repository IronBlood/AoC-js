import {
	count_safe_tiles,
} from "./lib.js";

describe("2016-12-18", () => {
	const testcases = [
		[`..^^.`, 3, 6],
		[`.^^.^.^^^^`, 10, 38],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_safe_tiles(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

