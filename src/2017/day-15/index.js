import {
	find_pairs,
	find_pairs2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.time("part1");
	console.log(find_pairs(content));
	console.timeEnd("part1");
	console.time("part2");
	console.log(find_pairs(content, 2));
	console.timeEnd("part2");

	console.time("part1");
	console.log(find_pairs2(content));
	console.timeEnd("part1");
	console.time("part2");
	console.log(find_pairs2(content, 2));
	console.timeEnd("part2");
}
