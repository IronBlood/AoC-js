import {
	get_points,
	find_beam_square,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_points(content));
	console.log(find_beam_square(content));
}
