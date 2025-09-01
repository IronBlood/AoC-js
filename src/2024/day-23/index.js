import {
	count_start_with,
	find_passwd,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_start_with(content));
	console.log(find_passwd(content));
}
