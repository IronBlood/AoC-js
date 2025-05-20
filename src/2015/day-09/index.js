import {
	shortest,
	longest,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const lines = content.split("\n");
	console.log(shortest(lines));
	console.log(longest(lines));
}

