import {
	get_mul,
	decode,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_mul(content));
	console.log(decode(content));
}
