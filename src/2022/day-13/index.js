import {
	sum_indices,
	decoder_key,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_indices(content));
	console.log(decoder_key(content));
}
