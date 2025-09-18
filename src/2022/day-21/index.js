import {
	get_root,
	get_humn,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_root(content));
	console.log(get_humn(content));
}
