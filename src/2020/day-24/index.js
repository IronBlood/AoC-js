import {
	count_black,
	count_black2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_black(content));
	console.log(count_black2(content));
}
