import {
	min_steps,
	first_block,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(min_steps(content, 1024, [70, 70]));
	console.log(first_block(content, [70,70]));
}
