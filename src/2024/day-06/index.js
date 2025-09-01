import {
	count_distinct,
	possible_loops,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_distinct(content));
	console.log(possible_loops(content));
}
