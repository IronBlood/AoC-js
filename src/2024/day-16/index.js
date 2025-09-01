import {
	lowest_score,
	count_tiles_bfs,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(lowest_score(content));
	console.log(count_tiles_bfs(content));
}
