import {
	get_points,
	count_cards,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_points(content));
	console.log(count_cards(content));
}
