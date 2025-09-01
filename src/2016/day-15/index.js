import {
	first_time,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(first_time(content));
	console.log(first_time(content, 2));
}
