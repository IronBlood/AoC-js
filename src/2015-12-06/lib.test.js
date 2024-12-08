import {
	parse,
} from "./lib.js";

describe("2015-12-06 p1", () => {
	const testcases = [
		["turn on 0,0 through 999,999", [[0,0], [999,999], 1]],
		["toggle 0,0 through 999,0", [[0,0], [999,0], 2]],
		["turn off 499,499 through 500,500", [[499,499], [500,500], 0]],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(parse(tc[0])).toStrictEqual(tc[1]);
		})
	}
});

