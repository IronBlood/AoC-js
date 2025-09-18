import {
	get_power_consumption,
	get_life_support_rating,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_power_consumption(content));
	console.log(get_life_support_rating(content));
}
