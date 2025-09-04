import {
	count_passports,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_passports(content));
	console.log(count_passports(content, 2));
}
