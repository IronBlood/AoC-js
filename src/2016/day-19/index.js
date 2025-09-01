import {
	get_all,
	get_all_2_linkedlist,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_all(+content));
	console.log(get_all_2_linkedlist(+content));
}
