import {
	highest_score,
} from "./lib.js";

describe("2018-12-09 p1", () => {
	const testcases = [
		[`9 players; last marble is worth 25 points`, 32],
		[`10 players; last marble is worth 1618 points`, 8317],
		[`13 players; last marble is worth 7999 points`, 146373],
		[`17 players; last marble is worth 1104 points`, 2764],
		[`21 players; last marble is worth 6111 points`, 54718],
		[`30 players; last marble is worth 5807 points`, 37305],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(highest_score(tc[0])).toBe(tc[1]);
		})
	}
});

