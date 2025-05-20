import {
	count_houses,
	count_houses_with_robo,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_houses(content));
	console.log(count_houses_with_robo(content));
}

