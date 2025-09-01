import {
	get_steps,
	first_larger_value,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_steps(+content));
	console.log(first_larger_value(+content));
}
