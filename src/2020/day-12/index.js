import {
	get_distance,
	get_distance_2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_distance(content));
	console.log(get_distance_2(content));
}
