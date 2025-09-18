import {
	count_visible_trees,
	highest_scenic_score,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_visible_trees(content));
	console.log(highest_scenic_score(content));
}
