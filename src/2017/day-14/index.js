import {
	count_squares,
	count_regions,
} from "./lib.js"

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_squares(content));
	console.log(count_regions(content));
}
