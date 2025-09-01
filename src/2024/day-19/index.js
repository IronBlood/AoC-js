import {
	possible_patterns,
	total_ways,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(possible_patterns(content));
	console.log(total_ways(content));
}
