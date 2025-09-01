import {
	minimum_token,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(minimum_token(content));
	console.log(minimum_token(content, 2));
}
