import {
	parse_and_calc,
	parse_and_calc_with_flags,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(parse_and_calc(content));
	console.log(parse_and_calc_with_flags(content));
}
