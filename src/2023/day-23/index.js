import {
	longest_hike,
	longest_hike_fast,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(longest_hike(content));
	console.log(longest_hike_fast(content, 1));
	console.log(longest_hike_fast(content, 2));
}
