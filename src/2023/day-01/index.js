import {
	get_sum,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_sum(content));
	console.log(get_sum(content, 2));
}
