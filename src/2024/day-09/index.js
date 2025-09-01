import {
	compact_and_get_checksum1,
	compact_and_get_checksum2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(compact_and_get_checksum1(content));
	console.log(compact_and_get_checksum2(content));
}
