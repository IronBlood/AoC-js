import {
	count_overlapped_points,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_overlapped_points(content));
	console.log(count_overlapped_points(content, 2));
}
