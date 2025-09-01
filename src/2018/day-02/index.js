import {
	get_checksum,
	get_common_letter,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_checksum(content));
	console.log(get_common_letter(content));
}
