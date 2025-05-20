import {
	is_nice,
	is_nice2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const lines = content.split("\n");
	console.log(lines.reduce((sum, curr) => sum + is_nice(curr), 0));
	console.log(lines.reduce((sum, curr) => sum + is_nice2(curr), 0));
}

