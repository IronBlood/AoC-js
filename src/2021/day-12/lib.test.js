import { describe, it, expect } from '@jest/globals';
import {
	count_paths,
} from "./lib.js";

describe("2021-12-12 p1", () => {
	const testcases = [
		[`start-A
start-b
A-c
A-b
b-d
A-end
b-end`, 10, 36],
		[`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`, 19, 103],
		[`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`, 226, 3509],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_paths(tc[0])).toBe(tc[1]);
			expect(count_paths(tc[0], 2)).toBe(tc[2]);
		});
	}
});
