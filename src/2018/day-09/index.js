import {
	highest_score,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(highest_score(content));
	console.log(highest_score(content, 2));
}
