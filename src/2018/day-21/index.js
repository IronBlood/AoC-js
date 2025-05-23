import {
	run,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const data = run(content, true);
	console.log(data.part1, data.part2);
}
