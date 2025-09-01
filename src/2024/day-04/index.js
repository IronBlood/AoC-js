import {
	count_word,
	count_x,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_word(content, "XMAS"));
	console.log(count_x(content, "MAS"));
}
