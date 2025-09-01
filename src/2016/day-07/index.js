import {
	count_supports,
} from "./lib.js";

export function main(content) {
	console.log(count_supports(content));
	console.log(count_supports(content, 2));
}
