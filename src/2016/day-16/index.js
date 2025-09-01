import {
	disk_checksum,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(disk_checksum(content, 272));
	console.log(disk_checksum(content, 35651584));
}
