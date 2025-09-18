import { describe, it, expect } from '@jest/globals';
import {
	get_surface_area,
} from "./lib.js";

describe("2022-12-18", () => {
	const testcases = [
		[`2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`, [64, 58]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_surface_area(tc[0])).toStrictEqual(tc[1]);
		});
	}
});
