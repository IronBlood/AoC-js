import {
	actual_passwd,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(actual_passwd(content));
	console.log(actual_passwd(content, 2));
}
