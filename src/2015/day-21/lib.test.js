import {
	can_win,
} from "./lib.js";

describe("2015-12-21 p1", () => {
	const testcases = [
		[{ hp: 8, damage: 5, armor: 5 }, { hp: 12, damage: 7, armor: 2 }, true],
		[{ hp: 100, damage: 4, armor: 0 }, { hp: 103, damage: 9, armor: 2 }, false],
		[{ hp: 100, damage: 9, armor: 2 }, { hp: 103, damage: 9, armor: 2 }, true],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(can_win(tc[0], tc[1])).toBe(tc[2]);
		})
	}
});

