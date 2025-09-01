import {
	lowest_ip,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(lowest_ip(content));
	console.log(lowest_ip(content, 2));
}
