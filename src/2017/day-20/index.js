import {
	closest_particle,
	count_left,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(closest_particle(content));
	console.log(count_left(content));
}
