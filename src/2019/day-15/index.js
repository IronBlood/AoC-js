import {
	find_oxygen,
	count_minutes,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const {
		walls,
		oxygen_location,
		oxygen_step,
	} = find_oxygen(content);
	console.log(oxygen_step);
	console.log(count_minutes(walls, oxygen_location));
}
