import {
	get_letters,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_letters(content));
	console.log(get_letters(content, 2));
}
