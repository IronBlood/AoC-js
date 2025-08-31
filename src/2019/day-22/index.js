import {
	find_2019,
	find_x,
	reverse_x,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(find_2019(content));
	console.log(find_x(content, 10007, 2019));
	console.log(reverse_x(content, 119315717514047n, 2020, 101741582076661n));
}
