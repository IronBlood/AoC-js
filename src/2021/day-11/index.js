import {
	count_flashes,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_flashes(content));
	console.log(count_flashes(content, 2));
}
