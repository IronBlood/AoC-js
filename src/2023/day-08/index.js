import {
	count_steps,
	count_steps2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_steps(content));
	console.log(count_steps2(content));
}
