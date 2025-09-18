import {
	sum_dir,
	find_dir_to_delete,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_dir(content));
	console.log(find_dir_to_delete(content));
}
