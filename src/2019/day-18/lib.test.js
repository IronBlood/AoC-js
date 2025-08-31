// @ts-check
import { describe, it, expect } from '@jest/globals';
import {
	build_graph,
	count_steps,
} from "./lib.js";

describe("2019-12-18 p1-ut_build_graph", () => {
	const grid = [
		"#########",
		"#b.A.@.a#",
		"#########",
	].map(row => row.split(""));

	const graph = build_graph(grid);

	describe("check length of keys", () => {
		const expected_keys = ["b", "A", "@", "a"];
		const keys = Object.keys(graph);

		it("length should be equal", () => {
			expect(keys.length).toBe(expected_keys.length);
		});

		for (const key of expected_keys) {
			it(`key ${key} should exist`, () => {
				expect(key.indexOf(key)).toBeGreaterThanOrEqual(0);
			});
		}
	});

	describe("check positions", () => {
		/** @type {[string, [number, number]][]} */
		const testcases = [
			[ "b", [1, 1] ],
			[ "A", [1, 3] ],
			[ "@", [1, 5] ],
			[ "a", [1, 7] ],
		];

		for (let i = 0; i < testcases.length; i++) {
			const tc = testcases[i];
			it(`test-${i}: position of ${tc[0]} should be [${tc[1].join(",")}]`, () => {
				expect(graph[tc[0]].position).toStrictEqual(tc[1]);
			})
		}
	});

	describe("check neighbors", () => {
		const testcases = [
			{
				char: "b",
				neighbors: [
					{ char: "A", steps: 2 },
				],
			},
			{
				char: "A",
				neighbors: [
					{ char: "b", steps: 2 },
					{ char: "@", steps: 2 },
				],
			},
			{
				char: "@",
				neighbors: [
					{ char: "A", steps: 2 },
					{ char: "a", steps: 2 },
				],
			},
			{
				char: "a",
				neighbors: [
					{ char: "@", steps: 2 },
				],
			},
		];

		for (let i = 0; i < testcases.length; i++) {
			const tc = testcases[i];
			it(`test-${i}`, () => {
				const neighbors = graph[tc.char].neighbors;
				expect(Object.keys(neighbors).length).toBe(tc.neighbors.length);
				for (const {char, steps} of tc.neighbors) {
					expect(neighbors[char]).toBe(steps);
				}
			});
		}
	});
});

describe("2019-12-18 p1", () => {
	/** @type {[string, number][]} */
	const testcases = [
		[`#########
#b.A.@.a#
#########`, 8],
		[`########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`, 86],
		[`########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`, 132],
		[`#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`, 136],
		[`########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`, 81],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_steps(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2019-12-18 p2", () => {
	/** @type {[string, number][]} */
	const testcases = [
		[`#######
#a.#Cd#
##...##
##.@.##
##...##
#cB#Ab#
#######`, 8],
		[`###############
#d.ABC.#.....a#
######...######
######.@.######
######...######
#b.....#.....c#
###############`, 24],
		[`#############
#DcBa.#.GhKl#
#.###...#I###
#e#d#.@.#j#k#
###C#...###J#
#fEbA.#.FgHi#
#############`, 32],
		[`#############
#g#f.D#..h#l#
#F###e#E###.#
#dCba...BcIJ#
#####.@.#####
#nK.L...G...#
#M###N#H###.#
#o#m..#i#jk.#
#############`, 72],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(count_steps(tc[0], 2)).toBe(tc[1]);
		})
	}
});
