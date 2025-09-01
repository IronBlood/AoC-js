import {
	shortest_steps,
	count_locations,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(shortest_steps(content, [31,39]));
	console.log(count_locations(content));
}
