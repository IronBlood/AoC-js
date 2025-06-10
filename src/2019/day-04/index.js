import {
	count_passwords,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_passwords(content));
	console.log(count_passwords(content, 2));
}
