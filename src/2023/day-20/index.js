import {
	count_pulses,
	min_clicks,
	dump_graph,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_pulses(content));
	console.log(min_clicks(content));
	// console.error(dump_graph(content));
}
