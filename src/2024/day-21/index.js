import {
	min_complexities,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(min_complexities(content));
	console.log(min_complexities(content, 2));
}
