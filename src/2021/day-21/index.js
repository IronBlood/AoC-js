import {
	get_losing_point,
	get_most_winning,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_losing_point(content));
	console.log(get_most_winning(content));
}
