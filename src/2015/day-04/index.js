import {
	mine_coin
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const lines = content.split("\n");
	console.log(mine_coin(lines));
	console.log(mine_coin(lines, 6));
}

