import {
	get_sum,
	get_sum_incorrect,
} from "./lib.js";

const testcases = [
	[`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`, 143, 123],
];

describe("2024-12-05 p1", () => {
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_sum(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2024-12-05 p2", () => {
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_sum_incorrect(tc[0])).toBe(tc[2]);
		})
	}
});

