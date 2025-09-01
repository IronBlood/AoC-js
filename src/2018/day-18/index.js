import {
	get_total_resource,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_total_resource(content));
	console.log(get_total_resource(content, 1000000000));
}
