import {
	get_sum,
	get_sum_incorrect,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_sum(content));
	console.log(get_sum_incorrect(content));
}
