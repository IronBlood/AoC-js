import {
	count_blocks,
	count_blocks_HQ,
} from "./lib.js";

export function main(content) {
	console.log(count_blocks(content));
	console.log(count_blocks_HQ(content));
}
