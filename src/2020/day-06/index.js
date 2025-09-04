import {
	sum_counts,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_counts(content));
	console.log(sum_counts(content, 2));
}
