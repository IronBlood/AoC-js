import {
	total_ribbon,
	total_square,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const lines = content.split("\n");
	console.log(lines.reduce((sum, curr) => sum + total_square(curr), 0));
	console.log(lines.reduce((sum, curr) => sum + total_ribbon(curr), 0));
}

