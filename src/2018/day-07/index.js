import {
	correct_order,
	count_seconds,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(correct_order(content));
	console.log(count_seconds(content, 5, 60));
}
