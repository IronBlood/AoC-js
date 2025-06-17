import {
	get_highest_signal,
	get_highest_signal2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_highest_signal(content));
	console.log(get_highest_signal2(content));
}
