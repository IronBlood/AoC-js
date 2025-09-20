import { describe, it, expect } from '@jest/globals';
import {
	sum_rating,
	all_combinations,
	count_condition_x,
	sum_conditions,
} from "./lib.js";

describe("2023-12-19", () => {
	const testcases = [
		[`px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`, 19114, 167409079868000],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_rating(tc[0])).toBe(tc[1]);
			expect(all_combinations(tc[0])).toBe(tc[2]);
		});
	}
});

describe("2023-12-19 p2-ut_count_condition_x", () => {
	const testcases = [
		[
			[
				{ oprand: 's', opcode: '>=', op_num: 1351 },
				{ oprand: 's', opcode: '<=', op_num: 2770 },
			],
			1420,
		],
		[
			[
				{ oprand: 'm', opcode: '<', op_num: 1801 },
				{ oprand: 'm', opcode: '>', op_num: 838 },
			],
			962,
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_condition_x(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2023-12-19 p2-ut_sum_conditions", () => {
	const testcases = [
		[
			[
				[
					{ oprand: 's', opcode: '>=', op_num: 1351 },
					{ oprand: 's', opcode: '<=', op_num: 2770 },
				],
				[
					{ oprand: 'm', opcode: '<', op_num: 1801 },
					{ oprand: 'm', opcode: '>', op_num: 838 },
				],
			],
			21856640000000,
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_conditions(tc[0])).toBe(tc[1]);
		});
	}
});
