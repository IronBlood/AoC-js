import {
	sum_of_gps_coordinates,
	sum_of_gps_coordinates_2,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(sum_of_gps_coordinates(content));
	console.log(sum_of_gps_coordinates_2(content));
}
