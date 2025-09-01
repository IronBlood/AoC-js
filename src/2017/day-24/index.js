import {
	build_bridge,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(build_bridge(content));
	console.log(build_bridge(content, 2));
}
