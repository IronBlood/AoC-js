import {
	get_encryption_key,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_encryption_key(content));
}
