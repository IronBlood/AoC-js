import {
	total_winning,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_winning(content));
	console.log(total_winning(content, 2));
}
