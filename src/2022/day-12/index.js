import {
	fewest_steps,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(fewest_steps(content));
	console.log(fewest_steps(content, 2));
}
