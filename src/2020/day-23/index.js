import {
	get_label,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_label(content));
	console.log(get_label(content, 10000000, 2));
}
