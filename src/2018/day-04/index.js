import {
	get_most_asleep,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_most_asleep(content));
	console.log(get_most_asleep(content, 2));
}
