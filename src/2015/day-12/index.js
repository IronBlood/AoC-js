import {
	sum_numbers,
	sum_numbers_exclude_red,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_numbers(content));
	console.log(sum_numbers_exclude_red(content));
}

