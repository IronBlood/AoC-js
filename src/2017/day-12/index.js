import {
	count_connected,
	count_groups,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_connected(content));
	console.log(count_groups(content));
}
