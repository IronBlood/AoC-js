import {
	count_visible_dots_after_first_fold,
	get_message,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_visible_dots_after_first_fold(content));
	console.log(get_message(content));
}
