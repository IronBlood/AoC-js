import {
	farthest,
	most_points,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const lines = content.split("\n");
	console.log(farthest(lines, 2503));
	console.log(most_points(lines, 2503));
}

