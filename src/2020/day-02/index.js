import {
	count_valid_passwords,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_valid_passwords(content));
	console.log(count_valid_passwords(content, 2));
}
