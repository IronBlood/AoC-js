import {
	get_reg0,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_reg0(content));
	console.log(get_reg0(content, 2));
}
