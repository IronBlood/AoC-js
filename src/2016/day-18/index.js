import {
	count_safe_tiles,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_safe_tiles(content, 40));
	console.log(count_safe_tiles(content, 400000));
}
