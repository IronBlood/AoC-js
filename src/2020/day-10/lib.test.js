import { describe, it, expect } from '@jest/globals';
import {
	diff_1_and_3_jolt_product,
	find_ways,
} from "./lib.js";

describe("2020-12-10 p1", () => {
	const testcases = [
		[`16
10
15
5
1
11
7
19
6
12
4`, 35],
		[`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`, 220],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(diff_1_and_3_jolt_product(tc[0])).toBe(tc[1]);
		});
	}
});

describe("2020-12-10 p2", () => {
	const testcases = [
		[`16
10
15
5
1
11
7
19
6
12
4`, 8n],
		[`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`, 19208n],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(find_ways(tc[0])).toBe(tc[1]);
		});
	}
});
