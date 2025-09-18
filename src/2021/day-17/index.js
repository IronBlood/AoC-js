import {
	get_highest_y_pos,
	count_pairs,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_highest_y_pos(content));
	console.log(count_pairs(content));
}
