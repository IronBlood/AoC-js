import { describe, it, expect } from '@jest/globals';
import {
	energized_tiles,
	most_energized,
} from "./lib.js";

describe("2023-12-16 p1", () => {
	const testcases = [
		[`.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`, 46, 51],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(energized_tiles(tc[0])).toBe(tc[1]);
			expect(most_energized(tc[0])).toBe(tc[2]);
		});
	}
});
