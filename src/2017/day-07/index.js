import {
	get_root,
	find_wrong_weight,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_root(content));
	console.log(find_wrong_weight(content));
}
