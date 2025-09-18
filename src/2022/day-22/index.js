import {
	get_password,
	get_password2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_password(content));
	console.log(get_password2(content));
}
