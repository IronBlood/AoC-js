import { describe, it, expect } from '@jest/globals';
import {
	total_distance,
	total_similarity,
} from "./lib.js";

it("2024-12-01", () => {
	const arr1 = [2,1,3,3,3,4],
		arr2 = [9,5,4,3,3,3];

	expect(total_distance(arr1, arr2)).toBe(11);
	expect(total_similarity(arr1, arr2)).toBe(31);
});

