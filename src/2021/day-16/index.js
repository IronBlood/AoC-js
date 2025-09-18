import {
	get_value_from_packet,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_value_from_packet(content));
	console.log(get_value_from_packet(content, 2));
}
