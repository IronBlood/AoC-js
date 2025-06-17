import {
	total_orbits,
	min_transfer,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_orbits(content));
	console.log(min_transfer(content));
}
