import { describe, it, expect } from '@jest/globals';
import {
	dig_cubes_2,
	dig_cubes_3,
} from "./lib.js";

describe("2023-12-18", () => {
	const testcases = [
		[`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`, 1, 62n],
		[`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`, 2, 952408144115n],
		[`U 1
R 1
U 1
R 1
D 2
L 2`, 1, 8n],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(dig_cubes_2(tc[0], tc[1])).toBe(tc[2]);
			expect(dig_cubes_3(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});
