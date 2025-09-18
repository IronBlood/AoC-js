import {
	get_lowest_points,
	get_basins,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_lowest_points(content));
	console.log(get_basins(content));
}
