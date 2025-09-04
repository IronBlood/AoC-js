import {
	get_nth_num,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_nth_num(content));
	console.log(get_nth_num(content, 2));
}
