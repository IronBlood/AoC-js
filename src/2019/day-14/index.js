import {
	calc_ores,
	max_fuel,
	calc_ores_N,
	max_fuel_N,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const t0 = performance.now();

	console.log(calc_ores(content));
	console.log(max_fuel(content));
	const t1 = performance.now();

	console.log(calc_ores_N(content));
	console.log(max_fuel_N(content));
	const t2 = performance.now();

	console.log(`part1 ${(t1 - t0).toFixed(3)} ms`);
	console.log(`part2 ${(t2 - t1).toFixed(3)} ms`);
}
