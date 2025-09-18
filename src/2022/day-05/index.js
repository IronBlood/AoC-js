import {
	get_top_crates,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_top_crates(content));
	console.log(get_top_crates(content, 2));
}
