import {
	hull_damage,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(hull_damage(content));
	console.log(hull_damage(content, 2));
}
