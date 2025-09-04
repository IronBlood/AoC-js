import {
	check_my_ticket,
	get_error_rate,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_error_rate(content));
	console.log(check_my_ticket(content));
}
