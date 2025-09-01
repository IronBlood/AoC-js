import {
	count_decompressed_length,
	count_decompressed_length_2,
} from "./lib.js";

export function main(content) {
	console.log(count_decompressed_length(content));
	console.log(count_decompressed_length_2(content));
}
