import {
	minimum_moves,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(minimum_moves(content));
	console.log(minimum_moves(content, 2));
}
