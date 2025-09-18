import { describe, it, expect } from '@jest/globals';
import {
	CompareResult,
	compare,
	sum_indices,
	decoder_key,
} from "./lib.js";

describe("2022-12-13 p1-ut_compare", () => {
	const testcases = [
		[
			[1,1,3,1,1],
			[1,1,5,1,1],
			CompareResult.TRUE,
		],
		[
			[[1],[2,3,4]],
			[[1],4],
			CompareResult.TRUE,
		],
		[
			[9],
			[[8,7,6]],
			CompareResult.FALSE,
		],
		[
			[[4,4],4,4],
			[[4,4],4,4,4],
			CompareResult.TRUE,
		],
		[
			[7,7,7,7],
			[7,7,7],
			CompareResult.FALSE,
		],
		[
			[],
			[3],
			CompareResult.TRUE,
		],
		[
			[[[]]],
			[[]],
			CompareResult.FALSE,
		],
		[
			[1,[2,[3,[4,[5,6,7]]]],8,9],
			[1,[2,[3,[4,[5,6,0]]]],8,9],
			CompareResult.FALSE,
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(compare(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});

describe("2022-12-13", () => {
	const testcases = [
		[`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`, 13, 140],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_indices(tc[0])).toBe(tc[1]);
			expect(decoder_key(tc[0])).toBe(tc[2]);
		});
	}
});
