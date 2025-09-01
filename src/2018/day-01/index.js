import {
	get_freq,
	get_freq_2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_freq(content));
	console.log(get_freq_2(content));
}
