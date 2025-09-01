import { describe, it, expect } from '@jest/globals';
import {
	make_a_cookie,
	make_a_cookie_with_fixed_calorie,
} from "./lib.js";

const recipes = [
	"Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
	"Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3",
];

describe("2015-12-15", () => {
	it("test-0", () => {
		expect(make_a_cookie(recipes)).toBe(62842880);
	});
	it("test-1", () => {
		expect(make_a_cookie_with_fixed_calorie(recipes, 500)).toBe(57600000);
	});
});

