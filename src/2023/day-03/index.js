import {
	sum,
	gear_ratios,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum(content));
	console.log(gear_ratios(content));
}
