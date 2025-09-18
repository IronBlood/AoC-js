import {
	find_total_score,
	find_middle_score,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(find_total_score(content));
	console.log(find_middle_score(content));
}
