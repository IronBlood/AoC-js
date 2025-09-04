import {
	winner_score,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(winner_score(content));
	console.log(winner_score(content, 2));
}
