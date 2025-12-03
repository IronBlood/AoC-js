import { total_joltage } from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_joltage(content));
	console.log(total_joltage(content, 2));
}
