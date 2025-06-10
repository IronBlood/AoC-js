import {
	closest_intersection,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(closest_intersection(content));
	console.log(closest_intersection(content, 2));
}
