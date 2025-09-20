import {
	lowest_location,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(lowest_location(content));
	console.log(lowest_location(content, 2));
}
