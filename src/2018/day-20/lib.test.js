import { describe, it, expect } from '@jest/globals';
import {
	do_fewest_doors,
	get_count,
} from "./lib.js";

describe("2018-12-20 p1", () => {
	const testcases = [
		[`^WNE$`, 3],
		[`^ENWWW(NEEE|SSE(EE|N))$`, 10],
		[`^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$`, 18],
		[`^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$`, 23],
		[`^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$`, 31],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(get_count(tc[0])).toBe(tc[1]);
		})
	}
});

describe("2018-12-20 ut-do_fewest_doors", () => {
	const testcases = [
		[`#####
#.|.#
#-###
#.|X#
#####`, 3],
		[`#########
#.|.|.|.#
#-#######
#.|.|.|.#
#-#####-#
#.#.#X|.#
#-#-#####
#.|.|.|.#
#########`, 10],
		[`###########
#.|.#.|.#.#
#-###-#-#-#
#.|.|.#.#.#
#-#####-#-#
#.#.#X|.#.#
#-#-#####-#
#.#.|.|.|.#
#-###-###-#
#.|.|.#.|.#
###########`, 18],
		[`#############
#.|.|.|.|.|.#
#-#####-###-#
#.#.|.#.#.#.#
#-#-###-#-#-#
#.#.#.|.#.|.#
#-#-#-#####-#
#.#.#.#X|.#.#
#-#-#-###-#-#
#.|.#.|.#.#.#
###-#-###-#-#
#.|.#.|.|.#.#
#############`, 23],
		[`###############
#.|.|.|.#.|.|.#
#-###-###-#-#-#
#.|.#.|.|.#.#.#
#-#########-#-#
#.#.|.|.|.|.#.#
#-#-#########-#
#.#.#.|X#.|.#.#
###-#-###-#-#-#
#.|.#.#.|.#.|.#
#-###-#####-###
#.|.#.|.|.#.#.#
#-#-#####-#-#-#
#.#.|.|.|.#.|.#
###############`, 31],
	];

	for (let i = 0; i < testcases.length; i++) {
		it(`test-${i}`, () => {
			const tc = testcases[i];
			expect(do_fewest_doors(tc[0])).toBe(tc[1]);
		})
	}
});

