import {
	total_risk,
	fewest_minutes,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_risk(content));
	console.log(fewest_minutes(content));
}
