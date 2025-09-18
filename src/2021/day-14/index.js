import {
	get_substraction,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_substraction(content));
	console.log(get_substraction(content, 40));
}
