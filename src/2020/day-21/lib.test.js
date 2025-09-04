// @ts-check
import { describe, it, expect } from '@jest/globals';
/**
 * @typedef {import("./types").Food} Food
 */

import {
	parse_line,
	solve21,
} from "./lib.js";

describe("2020-12-21 p1-ut_parse_line", () => {
	/** @type {[string, Food][]} */
	const testcases = [
		["mxmxvkd kfcds sqjhc nhms (contains dairy, fish)", {
			ingredients: ["mxmxvkd", "kfcds", "sqjhc", "nhms"],
			allergens: ["dairy", "fish"],
		}],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(parse_line(tc[0])).toStrictEqual(tc[1]);
		});
	}
});

describe("2020-12-21", () => {
	/** @type {[string, number, string][]} */
	const testcases = [
		[`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`, 5, "mxmxvkd,sqjhc,fvjkl"],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const [count, list] = solve21(tc[0]);
			expect(count).toBe(tc[1]);
			expect(list).toBe(tc[2]);
		});
	}
});
