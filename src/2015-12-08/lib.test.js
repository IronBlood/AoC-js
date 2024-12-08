import {
	diff_decode,
	diff_encode,
} from "./lib.js";

describe("2015-12-08", () => {
	const lines = [
		"\"\"",
		"\"abc\"",
		"\"aaa\\\"aaa\"",
		'"\\x27"',
	];
	it("test-0", () => {
		expect(diff_decode(lines)).toBe(12);
	});
	it("test-1", () => {
		expect(diff_encode(lines)).toBe(19);
	});
});

