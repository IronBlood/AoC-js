import {
	count_intersections,
	initial_position_sage,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_intersections(content, 200000000000000, 400000000000000));
	console.error(initial_position_sage(content));
}
