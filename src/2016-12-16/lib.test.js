import {
	dragon_curve,
	get_checksum,
	disk_checksum,
} from "./lib.js";

describe("2016-12-16 p1_ut-get_checksum", () => {
	const testcases = [
		[`110010110100`, `100`],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_checksum(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-16 p1_ut-dragon_curve", () => {
	const testcases = [
		[`10000`, `10000011110`],
		[`10000011110`, `10000011110010000111110`],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(dragon_curve(tc[0]).join("")).toBe(tc[1]);
		})
	}
});

describe("2016-12-16 p1", () => {
	const testcases = [
		[`10000`, 20, "01100"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(disk_checksum(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

