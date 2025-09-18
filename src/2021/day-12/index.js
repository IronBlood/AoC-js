import {
	count_paths,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_paths(content));
	console.log(count_paths(content, 2));
}
