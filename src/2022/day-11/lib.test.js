import { describe, it, expect } from '@jest/globals';
import {
	parse_operation,
	parse_test,
	level_business,
} from "./lib.js";

describe("2022-12-11 p1-ut_parse_operation", () => {
	const testcases = [
		[
			"  Operation: new = old * 19",
			[
				[ 1, 19 ],
				[ 2, 38 ],
				[ 3, 57 ],
			],
		],
		[
			"Operation: new = old + 6",
			[
				[ 1, 7 ],
				[ 2, 8 ],
				[ 3, 9 ],
			],
		],
		[
			"  Operation: new = 19 * old",
			[
				[ 1, 19 ],
				[ 2, 38 ],
				[ 3, 57 ],
			],
		],
		[
			"Operation: new = 6 + old",
			[
				[ 1, 7 ],
				[ 2, 8 ],
				[ 3, 9 ],
			],
		],
		[
			"  Operation: new = old + old",
			[
				[ 1, 2 ],
				[ 2, 4 ],
				[ 3, 6 ],
			],
		],
		[
			"  Operation: new = old * old",
			[
				[ 1, 1 ],
				[ 2, 4 ],
				[ 3, 9 ],
			],
		]
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const fn = parse_operation(tc[0]);
			expect(typeof fn).toBe("function");
			for (const [input, output] of tc[1]) {
				expect(fn(input)).toBe(output);
			}
		});
	}
});

describe("2022-12-11 p1-ut_pare_test", () => {
	const testcases = [
		[
			"Test: divisible by 19",
			[
				[ 19, true ],
				[ 18, false ],
			],
			19,
		],
		[
			"Test: divisible by 13",
			[
				[ 19, false ],
				[ 18, false ],
				[ 13, true ],
			],
			13,
		],
		[
			"Test: divisible by 17",
			[
				[ 19, false ],
				[ 18, false ],
				[ 17, true ],
			],
			17,
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const {
				fn,
				divisor,
			} = parse_test(tc[0]);
			expect(divisor).toBe(tc[2]);
			for (const [input, output] of tc[1]) {
				expect(fn(input)).toBe(output);
			}
		});
	}
});

describe("2022-12-11", () => {
	const testcases = [
		[`Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`, 10605, 2713310158],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			// expect(level_business(tc[0])).toBe(tc[1]);
			expect(level_business(tc[0], 2)).toBe(tc[2]);
		});
	}
});
