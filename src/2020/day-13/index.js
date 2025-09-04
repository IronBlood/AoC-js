import {
	min_waiting,
	earliest_timestamp,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(min_waiting(content));
	console.log(earliest_timestamp(content));
}
