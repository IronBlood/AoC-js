import { describe, it, expect } from '@jest/globals';
import {
	count_cubes,
	EnergyCube3,
} from "./lib.js";

describe("2020-12-17 p1-ut_EnergyCube", () => {
	it("should initialize with the correct dimensions and active cubes", () => {
		const data = `.#.
..#
###`;
		const cube = new EnergyCube3(data);
		expect(cube.x0).toBe(0);
		expect(cube.x1).toBe(2);
		expect(cube.y0).toBe(0);
		expect(cube.y1).toBe(2);
		expect(cube.z0).toBe(0);
		expect(cube.z1).toBe(0);
		expect(cube.cubes.size).toBe(5);
		expect(cube.cubes.has("0,1,0")).toBe(true);
		expect(cube.cubes.has("1,2,0")).toBe(true);
		expect(cube.cubes.has("2,0,0")).toBe(true);
		expect(cube.cubes.has("2,1,0")).toBe(true);
		expect(cube.cubes.has("2,2,0")).toBe(true);
	});
});

describe("2020-12-17 p1", () => {
	const testcases = [
		[`.#.
..#
###`, 1, 11],
		[`.#.
..#
###`, 2, 21],
		[`.#.
..#
###`, 3, 38],
		[`.#.
..#
###`, 6, 112],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_cubes(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});

describe("2020-12-17 p2", () => {
	const testcases = [
		[`.#.
..#
###`, 6, 848],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_cubes(tc[0], tc[1], 2)).toBe(tc[2]);
		});
	}
});
