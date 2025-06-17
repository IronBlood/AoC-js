import {
	most_detected,
	find_200th,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(most_detected(content).count);
	console.log(find_200th(content));
}
