import {
	get_corners,
	check_sea_monster,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_corners(content));
	console.log(check_sea_monster(content));
}
