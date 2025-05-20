import {
	arrange,
	//arrange_2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(arrange(content));
	console.log(arrange(content, 2));
}

