import {
	sim,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const lines = content.split("\n");

	console.log(sim(lines).get("a"));
	console.log(sim(lines, 2).get("a"));
}

