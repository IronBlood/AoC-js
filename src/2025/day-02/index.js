import {
	sum_invalid_ids,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_invalid_ids(content));
	console.log(sum_invalid_ids(content, 2));
}
