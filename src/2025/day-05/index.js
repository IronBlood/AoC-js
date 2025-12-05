import {
	count_fresh,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_fresh(content));
	console.log(count_fresh(content, 2));
}
