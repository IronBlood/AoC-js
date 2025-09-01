import {
	count_valid_passphrases,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_valid_passphrases(content));
	console.log(count_valid_passphrases(content, 2));
}
