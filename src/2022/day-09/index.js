import {
	count_tail_positions,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_tail_positions(content));
	console.log(count_tail_positions(content, 2));
}
