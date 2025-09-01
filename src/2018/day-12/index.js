import {
	all_pots,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(all_pots(content));
	console.log(all_pots(content, 2));
}
