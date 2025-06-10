import {
	winning_units,
	min_fix,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(winning_units(content));
	console.log(min_fix(content));
}
