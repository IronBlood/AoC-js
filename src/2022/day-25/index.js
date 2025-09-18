import {
	get_snafu_number,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_snafu_number(content));
}
