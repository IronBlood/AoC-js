import {
	count_trees,
	count_trees_2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_trees(content));
	console.log(count_trees_2(content));
}
