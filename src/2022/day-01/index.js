import {
	find_most,
	sum_top_three,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(find_most(content));
	console.log(sum_top_three(content));
}
