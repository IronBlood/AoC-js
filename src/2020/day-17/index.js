import {
	count_cubes,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_cubes(content));
	console.log(count_cubes(content, 6, 2));
}
