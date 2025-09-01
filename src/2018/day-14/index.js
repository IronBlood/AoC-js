import {
	get_score,
	first_appear,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_score(content));
	console.log(first_appear(content));
}
