import {
	overlapping_area,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(overlapping_area(content));
	console.log(overlapping_area(content, 2));
}
