import {
	shortest,
	longest,
} from "./lib.js";

describe("2015-12-09", () => {
	const lines = [
		"London to Dublin = 464",
		"London to Belfast = 518",
		"Dublin to Belfast = 141",
	];
	it("test-0", () => {
		expect(shortest(lines)).toBe(605);
	});
	it("test-1", () => {
		expect(longest(lines)).toBe(982);
	});
});

