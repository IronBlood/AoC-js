import {
	is_real_room,
	decrypt,
} from "./lib.js";

describe("2016-12-04 p1", () => {
	const testcases = [
		["aaaaa-bbb-z-y-x-123[abxyz]", 1],
		["a-b-c-d-e-f-g-h-987[abcde]", 1],
		["not-a-real-room-404[oarel]", 1],
		["totally-real-room-200[decoy]", 0],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(is_real_room(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-04 p2", () => {
	const testcases = [
		["qzmt-zixmtkozy-ivhz-343", "very encrypted name"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(decrypt(tc[0])).toBe(tc[1]);
		})
	}
});

