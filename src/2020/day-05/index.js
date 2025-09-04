import {
	get_highest_id,
	missing_ids,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_highest_id(content));
	console.log(missing_ids(content));
}
