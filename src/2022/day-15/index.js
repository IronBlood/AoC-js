import {
	count_positions,
	get_freq,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_positions(content, 2_000_000));
	console.log(get_freq(content));
}
