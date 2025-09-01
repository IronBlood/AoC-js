import {
	count_three_opcodes,
	get_reg0,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const [part1, part2] = content.split("\n\n\n\n");
	console.log(count_three_opcodes(part1));
	console.log(get_reg0(part1, part2));
}
