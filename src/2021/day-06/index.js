import {
	count_lanternfish,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_lanternfish(content));
	console.log(count_lanternfish(content, 256));
}
