import { describe, it, expect } from '@jest/globals';
import {
	sim,
} from "./lib.js";

describe("2015-12-07 p1", () => {
	const commands = [
		"123 -> x",
		"456 -> y",
		"x AND y -> d",
		"x OR y -> e",
		"x LSHIFT 2 -> f",
		"y RSHIFT 2 -> g",
		"NOT x -> h",
		"NOT y -> i",
	];
	it("test-0", () => {
		const result = sim(commands);
		expect(result.get("d")).toBe(72);
		expect(result.get("e")).toBe(507);
		expect(result.get("f")).toBe(492);
		expect(result.get("g")).toBe(114);
		expect(result.get("h")).toBe(65412);
		expect(result.get("i")).toBe(65079);
		expect(result.get("x")).toBe(123);
		expect(result.get("y")).toBe(456);
	});
});

