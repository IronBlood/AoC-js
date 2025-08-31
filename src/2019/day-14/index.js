import {
	calc_ores,
	max_fuel,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(calc_ores(content));
	console.log(max_fuel(content));
}
