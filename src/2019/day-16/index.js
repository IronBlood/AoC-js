import {
	first_eight_digit,
	get_msg,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(first_eight_digit(content));
	console.log(get_msg(content));
}
