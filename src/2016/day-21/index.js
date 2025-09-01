import {
	scramble,
	unscramble,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(scramble(content, "abcdefgh"));
	console.log(unscramble(content, "fbgdceah"));
}
