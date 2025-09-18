import { describe, it, expect } from '@jest/globals';
import {
	final_sum,
	parse_snail,
	Pair,
	max_sum,
} from "./lib.js";

describe("2021-12-18 p1-ut_parse_snail", () => {
	it("tree shouldn't be a number, and left 1, right 2", () => {
		const str = "[1,2]";
		const tree = parse_snail(str);
		expect(typeof tree).not.toBe("number");
		expect(tree).toBeInstanceOf(Pair);
		expect(tree.left).toBe(1);
		expect(tree.right).toBe(2);
	});

	it("tree shouldn't be a number, and left pair, right 3", () => {
		const str = "[[1,2],3]";
		const tree = parse_snail(str);
		expect(typeof tree).not.toBe("number");
		expect(tree).toBeInstanceOf(Pair);
		expect(tree.left).toBeInstanceOf(Pair);
		expect(tree.right).toBe(3);
		expect(tree.left.left).toBe(1);
		expect(tree.left.right).toBe(2);
	});
});

describe("2021-12-18", () => {
	const testcases = [
		[`[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`, 4140, 3993],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(final_sum(tc[0])).toBe(tc[1]);
			expect(max_sum(tc[0])).toBe(tc[2]);
		});
	}
});
