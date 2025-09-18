import {
	count_chars,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_chars(content));
	console.log(count_chars(content, 2));
}
