import {
	exec,
	exec2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(exec(content));
	console.log(exec2(content));
}
