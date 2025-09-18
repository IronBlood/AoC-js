import {
	get_board,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_board(content));
	console.log(get_board(content, 2));
}
