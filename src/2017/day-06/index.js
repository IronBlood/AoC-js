import {
	count_cycles,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_cycles(content));
	console.log(count_cycles(content, 2));
}
