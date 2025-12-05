import {
	count_rolls,
	count_rolls_all,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_rolls(content));
	console.log(count_rolls_all(content));
}
