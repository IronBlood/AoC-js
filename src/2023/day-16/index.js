import {
	energized_tiles,
	most_energized,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(energized_tiles(content));
	console.log(most_energized(content));
}
