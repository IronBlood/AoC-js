import {
	evaluate,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(evaluate(content));
	console.log(evaluate(content, 2));
}
