import { describe, it, expect } from '@jest/globals';
import {
	num_outer_bags_for_shiny_gold,
	count_total_bags_inside_shiny_gold,
} from "./lib.js";

describe("2020-12-07 p1", () => {
	const testcases = [
		[`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`, 4],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(num_outer_bags_for_shiny_gold(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-07 p2", () => {
	const testcases = [
		[`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`, 126],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_total_bags_inside_shiny_gold(tc[0])).toBe(tc[1]);
		});
	}
});
