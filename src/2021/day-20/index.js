import {
	count_lit_pixels,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_lit_pixels(content));
	console.log(count_lit_pixels(content, 2));
}
