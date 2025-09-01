import {
	sum_metadata,
	root_value,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_metadata(content));
	console.log(root_value(content));
}
