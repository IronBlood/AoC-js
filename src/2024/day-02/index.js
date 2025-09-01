import {
	is_safe,
	is_safe2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const lines = content.split("\n");

	console.log(lines.reduce((sum, curr) => sum + (is_safe(curr) ? 1 : 0), 0));
	console.log(lines.reduce((sum, curr) => sum + (is_safe2(curr) ? 1 : 0), 0));
}
