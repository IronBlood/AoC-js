import {
	total_score,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_score(content));
	console.log(total_score(content, 2));
}
