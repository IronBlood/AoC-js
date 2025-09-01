import {
	largest_total_power_pos,
	largest_total_power,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(largest_total_power_pos(+content));
	console.log(largest_total_power(+content));
}
