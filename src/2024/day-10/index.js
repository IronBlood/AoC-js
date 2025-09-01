import {
	sum_scores,
	sum_ratings,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_scores(content));
	console.log(sum_ratings(content));
}
