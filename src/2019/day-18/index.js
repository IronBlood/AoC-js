import {
	count_steps,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_steps(content));
	console.log(count_steps(content, 2));
}
