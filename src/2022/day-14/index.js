import {
	count_rest_sand,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_rest_sand(content));
	console.log(count_rest_sand(content, 2));
}
