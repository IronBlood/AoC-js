import {
	correct_order,
	count_seconds,
} from "./lib.js";

describe("2018-12-07 p1", () => {
	const testcases = [
		[`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`, "CABDFE"],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(correct_order(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-07 p2", () => {
	const testcases = [
		[`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`, 2, 0, 15],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_seconds(tc[0], tc[1], tc[2])).toBe(tc[3]);
		})
	}
});

