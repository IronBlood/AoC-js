import {
	count_antinode_locations,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_antinode_locations(content));
	console.log(count_antinode_locations(content, 2));
}
