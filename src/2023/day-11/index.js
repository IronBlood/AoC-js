import {
	sum_lengths,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_lengths(content));
	console.log(sum_lengths(content, 1000000));
}
