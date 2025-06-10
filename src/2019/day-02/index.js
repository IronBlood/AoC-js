import {
	get_pos0,
	get_pair,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_pos0(content, [12, 2]));
	console.log(get_pair(content));
}
