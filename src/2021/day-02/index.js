import {
	get_pos,
	get_pos2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_pos(content));
	console.log(get_pos2(content));
}
