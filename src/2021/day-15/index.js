import {
	lowest_total_risk,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(lowest_total_risk(content));
	console.log(lowest_total_risk(content, 2));
}
