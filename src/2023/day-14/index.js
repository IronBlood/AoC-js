import {
	total_load,
	total_load2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_load(content));
	console.log(total_load2(content));
}
