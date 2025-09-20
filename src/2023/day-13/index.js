import {
	sum_notes,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_notes(content));
	console.log(sum_notes(content, 2));
}
