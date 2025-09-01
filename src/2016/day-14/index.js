import {
	get_index,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_index(content));
	console.log(get_index(content, 2));
}
