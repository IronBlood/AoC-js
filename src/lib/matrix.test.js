// @ts-check
import { describe, it, expect } from '@jest/globals';
import {
	rotate_tile,
	flip_w_tile,
} from "./matrix.js";

describe("rotate", () => {
	/** @type {[number[][], 1|2|3, number[][]][]} */
	const testcases = [
		[
			[ [1, 2, 3], [4, 5, 6] ],
			3, // anticlockwise 90
			[
				[3, 6],
				[2, 5],
				[1, 4],
			],
		],
		[
			[ [1, 2, 3], [4, 5, 6] ],
			1, // clockwise 90
			[
				[4, 1],
				[5, 2],
				[6, 3],
			],
		],
		[
			[ [1, 2, 3], [4, 5, 6] ],
			2, // 180
			[ [6, 5, 4], [3, 2, 1] ],
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(rotate_tile(tc[0], tc[1])).toStrictEqual(tc[2]);
		});
	}
});

describe("flip", () => {
	const testcases = [
		[
			[ [1, 2, 3], [4, 5, 6] ],
			[ [3, 2, 1], [6, 5, 4] ],
		],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(flip_w_tile(tc[0])).toStrictEqual(tc[1]);
		});
	}
});
