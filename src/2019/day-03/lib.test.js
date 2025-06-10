import { describe, it, expect } from '@jest/globals';
import {
	closest_intersection,
} from "./lib.js";

describe("2019-12-03", () => {
	const testcases = [
		[`R8,U5,L5,D3
U7,R6,D4,L4`, 6, 30],
		[`R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`, 159, 610],
		[`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`, 135, 410],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(closest_intersection(tc[0])).toBe(tc[1]);
			expect(closest_intersection(tc[0], 2)).toBe(tc[2]);
		});
	}
});
