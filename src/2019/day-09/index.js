import {
	get_boost_keycode,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_boost_keycode(content));
	console.log(get_boost_keycode(content, 2));
}
