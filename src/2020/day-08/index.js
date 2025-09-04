import {
	get_acc,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_acc(content));
	console.log(get_acc(content, 2));
}
