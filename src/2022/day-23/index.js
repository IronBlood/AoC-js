import {
	count_empty_rectangles,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_empty_rectangles(content));
	console.log(count_empty_rectangles(content, 2));
}
