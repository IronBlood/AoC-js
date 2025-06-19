import {
	exec,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(exec(content));
	console.log(exec(content, 2));
}
