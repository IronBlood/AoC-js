import {
	first_crash,
	last_position,
} from "./lib.js";

describe("2018-12-13 p1", () => {
	const testcases = [
		[`|
v
|
|
|
^
|`, "0,3"],
		[[
			"/->-\\        ",
			"|   |  /----\\",
			"| /-+--+-\\  |",
			"| | |  | v  |",
			"\\-+-/  \\-+--/",
			"  \\------/   ",
		].join("\n"), "7,3"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(first_crash(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-13 p2", () => {
	const testcases = [
		[[
			"/>-<\\  ",
			"|   |  ",
			"| /<+-\\",
			"| | | v",
			"\\>+</ |",
			"  |   ^",
			"  \\<->/",
		].join("\n"), "6,4"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(last_position(tc[0])).toBe(tc[1]);
		})
	}
});

