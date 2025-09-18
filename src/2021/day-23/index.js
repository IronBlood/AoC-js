import {
	least_energy,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(least_energy(content));
	console.log(least_energy(content, 2));
}
