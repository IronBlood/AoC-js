import {
	sum_rating,
	all_combinations,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_rating(content));
	console.log(all_combinations(content));
}
