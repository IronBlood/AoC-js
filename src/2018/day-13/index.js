import {
	first_crash,
	last_position,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(first_crash(content));
	console.log(last_position(content));
}
