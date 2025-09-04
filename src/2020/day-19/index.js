import {
	count_messages,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_messages(content));
	console.log(count_messages(content, 2));
}
