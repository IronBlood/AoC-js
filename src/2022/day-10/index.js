import {
	sum_signal_strength,
	get_letters,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_signal_strength(content));
	console.log(get_letters(content));
}
