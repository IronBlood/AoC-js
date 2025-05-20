import {
	first_enter_basement,
	floor,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(floor(content));
	console.log(first_enter_basement(content));
}

