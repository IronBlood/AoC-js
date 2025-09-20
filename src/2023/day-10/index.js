import {
	solve,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(solve(content));
	console.log(solve(content, 2));
}
