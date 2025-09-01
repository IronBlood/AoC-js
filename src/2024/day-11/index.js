import {
	stones_after_blinks_optimized,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(stones_after_blinks_optimized(content, 25));
	console.log(stones_after_blinks_optimized(content, 75));
}
