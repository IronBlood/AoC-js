import {
	diff_decode,
	diff_encode,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const lines = content.split("\n");
	console.log(diff_decode(lines));
	console.log(diff_encode(lines));
}

