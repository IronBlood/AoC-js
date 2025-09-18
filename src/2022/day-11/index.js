import {
	level_business,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(level_business(content));
	console.log(level_business(content, 2));
}
