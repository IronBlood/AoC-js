import {
	get_count,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_count(content));
	console.log(get_count(content, 2));
}
