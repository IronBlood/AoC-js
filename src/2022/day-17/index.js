import {
	get_height,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_height(content));
	console.log(get_height(content, 1_000_000_000_000));
}
