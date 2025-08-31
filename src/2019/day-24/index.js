import {
	get_rating,
	count_bugs,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_rating(content));
	console.log(count_bugs(content, 200));
}
