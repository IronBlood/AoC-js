import {
	find_path,
} from "./lib.js";

describe("2016-12-17 p1", () => {
	const testcases = [
		[`ihgpwlah`, `DDRRRD`],
		[`kglvqrro`, `DDUDRLRRUDRD`],
		[`ulqzkmiv`, `DRURDRUDDLLDLUURRDULRLDUUDDDRR`],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_path(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2016-12-17 p2", () => {
	const testcases = [
		[`ihgpwlah`, 370],
		[`kglvqrro`, 492],
		[`ulqzkmiv`, 830],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_path(tc[0], 2)).toBe(tc[1]);
		})
	}
});

