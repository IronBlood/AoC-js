import {
	get_checksum,
	hash,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_checksum(content, 256));
	console.log(hash(content));
}
