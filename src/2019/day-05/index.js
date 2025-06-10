import {
	get_diagnostic_code,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_diagnostic_code(content));
	console.log(get_diagnostic_code(content, 2));
}
