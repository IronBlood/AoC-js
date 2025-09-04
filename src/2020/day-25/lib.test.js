import { describe, it, expect } from '@jest/globals';
import {
	get_encryption_key,
} from "./lib.js";

describe("2020-12-24", () => {
	const testcases = [
		[`5764801\n17807724`, 14897079],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_encryption_key(tc[0])).toBe(tc[1]);
		});
	}
});
