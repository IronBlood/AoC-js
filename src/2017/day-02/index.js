import {
	checksum,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(checksum(content));
	console.log(checksum(content, 2));
}
