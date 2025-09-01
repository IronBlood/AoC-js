import {
	after_dance,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(after_dance(content, "abcdefghijklmnop"));
	console.log(after_dance(content, "abcdefghijklmnop", 2));
}
