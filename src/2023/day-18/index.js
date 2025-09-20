import {
	dig_cubes,
	dig_cubes_2,
	dig_cubes_3,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log("--- flood-fill ---");
	console.log(dig_cubes(content));
	console.log("--- offset-polygon ---");
	console.log(dig_cubes_2(content, 1));
	console.log(dig_cubes_2(content, 2));
	console.log("--- showlace + Pick's theorem ---");
	console.log(dig_cubes_3(content, 1));
	console.log(dig_cubes_3(content, 2));
}
