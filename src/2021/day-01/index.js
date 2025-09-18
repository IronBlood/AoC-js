import {
	count_measurements,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_measurements(content));
	console.log(count_measurements(content, 2));
}
