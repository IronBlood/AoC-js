import {
	get_severity,
	get_delays,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_severity(content));
	console.log(get_delays(content));
}
