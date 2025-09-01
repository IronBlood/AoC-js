import {
	total_calibration,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_calibration(content));
	console.log(total_calibration(content, 2));
}
