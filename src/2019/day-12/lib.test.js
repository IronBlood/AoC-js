import { describe, it, expect } from '@jest/globals';
import {
	total_energy,
} from "./lib.js";

describe("2019-12-12 p1", () => {
	const testcases = [
		[`<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`, 10, 179],
		[`<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`, 100, 1940],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(total_energy(tc[0], tc[1])).toBe(tc[2]);
		});
	}
});
