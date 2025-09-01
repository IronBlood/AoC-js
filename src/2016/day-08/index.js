import {
	count_pixels_after_execution,
} from "./lib.js";

export function main(content) {
	/** @type {string[][]} */
	const screen = Array.from({ length: 6 }, () => Array(50).fill("."));
	console.log(count_pixels_after_execution(screen, content));
}
