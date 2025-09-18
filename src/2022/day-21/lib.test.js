import { describe, it, expect } from '@jest/globals';
import {
	get_root,
	get_humn,
} from "./lib.js";

describe("2022-12-21", () => {
	const testcases = [
		[`root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`, 152, 301],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_root(tc[0])).toBe(tc[1]);
			expect(get_humn(tc[0])).toBe(tc[2]);
		});
	}
});
