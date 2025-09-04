import {
	num_outer_bags_for_shiny_gold,
	count_total_bags_inside_shiny_gold,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(num_outer_bags_for_shiny_gold(content));
	console.log(count_total_bags_inside_shiny_gold(content));
}
