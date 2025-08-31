import {
	total_energy,
	system_cycle,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(total_energy(content));
	console.log(system_cycle(content));
}
