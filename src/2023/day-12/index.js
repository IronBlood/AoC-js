import {
	total_arrangements,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_arrangements(content));
	console.log(total_arrangements(content, 2));
}
