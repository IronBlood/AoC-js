import {
	largest_area,
	safe_regions,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(largest_area(content));
	console.log(safe_regions(content, 10000));
}
