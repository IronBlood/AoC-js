import {
	sum_hash,
	focusing_power,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_hash(content));
	// ["rn", "cm", "qp", "pc"].forEach(x => console.log(hash(x)));
	console.log(focusing_power(content));
}
