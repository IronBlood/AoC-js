import {
	count_fully_contain,
	count_overlap,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_fully_contain(content));
	console.log(count_overlap(content));
}
