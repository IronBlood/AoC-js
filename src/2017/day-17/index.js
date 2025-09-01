import {
	get_value,
	after_zero,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_value(+content));
	console.log(after_zero(+content));
}
