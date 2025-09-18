import {
	get_model_number,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_model_number(content));
	console.log(get_model_number(content, 2));
}
