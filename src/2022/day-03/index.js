import {
	sum_priorities,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_priorities(content));
	console.log(sum_priorities(content, 2));
}
