import {
	get_outcome,
	get_outcome2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_outcome(content));
	console.log(get_outcome2(content));
}
