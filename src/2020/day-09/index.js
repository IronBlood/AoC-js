import {
	get_first_exception,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_first_exception(content));
	console.log(get_first_exception(content, 25, 2));
}
