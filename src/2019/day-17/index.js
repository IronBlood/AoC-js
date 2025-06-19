import {
	get_sum,
	get_dust,
} from "./lib.js";

/**********************************************************
 * // Put your commands here                              *
 * // including routine, functions and y/n for video feed *
 * export const CMD = "";                                 *
 **********************************************************/
import {
	CMD,
} from "./cheat.js";

/**
 * @param {string} content
 */
export function main(content) {
	const { graph, sum } = get_sum(content);

	console.log(graph);
	console.log(sum);

	console.log(get_dust(content, CMD));
}
