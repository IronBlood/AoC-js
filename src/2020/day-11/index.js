import {
	count_seats,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_seats(content));
	console.log(count_seats(content, 2));
}
