import {
	count_cheats_by_saving,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_cheats_by_saving(content, 2, 100));
	console.log(count_cheats_by_saving(content, 20, 100));
}
