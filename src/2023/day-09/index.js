import {
	sum_extrapolated,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_extrapolated(content));
	console.log(sum_extrapolated(content, 2));
}
