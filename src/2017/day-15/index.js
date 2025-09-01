import {
	find_pairs,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(find_pairs(content));
	console.log(find_pairs(content, 2));
}
