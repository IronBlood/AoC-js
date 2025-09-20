import {
	least_heat_loss,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(least_heat_loss(content));
	console.log(least_heat_loss(content, 4, 10));
}
