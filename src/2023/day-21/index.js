import {
	count_tiles,
	count_tiles2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_tiles(content, 64));
	console.log(count_tiles2(content, 26501365));
}
