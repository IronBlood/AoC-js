import {
	count_infection,
	count_infection2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_infection(content, 10000));
	console.log(count_infection2(content, 10000000));
}
