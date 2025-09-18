import { describe, it, expect } from '@jest/globals';
import {
	sum_dir,
	find_dir_to_delete,
} from "./lib.js";

describe("2022-12-07 p1", () => {
	const testcases = [
		[`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`, 95437, 24933642],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(sum_dir(tc[0])).toBe(tc[1]);
			expect(find_dir_to_delete(tc[0])).toBe(tc[2]);
		});
	}
});
