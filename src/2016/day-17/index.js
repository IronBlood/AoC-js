import {
	find_path
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(find_path(content));
	console.log(find_path(content, 2));
}
