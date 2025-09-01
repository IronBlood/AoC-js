import { describe, it, expect } from '@jest/globals';
import {
	parse_groups,
	winning_units,
	min_fix,
} from "./lib.js";

describe("2018-12-24 p1-ut_parse_groups", () => {
	const testcases = [
		[`
18 units each with 729 hit points (weak to fire; immune to cold, slashing) with an attack that does 8 radiation damage at initiative 10`, [{
				units: 18,
				hp: 729,
				damage: 8,
				initiative: 10,
				attack_type: "radiation",
				weaknesses: ["fire"],
				immunities: ["cold", "slashing"],
				effective_power: 144,
				chosen: false,
			}]],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			const groups = parse_groups(tc[0]);
			expect(groups).toStrictEqual(tc[1]);
		});
	}
});

describe("2018-12-24", () => {
	const testcases = [
		[`Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`, 5216, 51],
	];
	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(winning_units(tc[0]).remaining).toBe(tc[1]);
			expect(min_fix(tc[0])).toBe(tc[2]);
		});
	}
});
