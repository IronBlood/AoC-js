import {
	get_total_resource,
} from "./lib.js";

describe("2018-12-18 p1", () => {
	const testcases = [
		[`.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`, 1147],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_total_resource(tc[0])).toBe(tc[1]);
		})
	}
});

