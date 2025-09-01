import {
	get_msg,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const ans = get_msg(content);
	console.log(ans.message);
	console.log(ans.second);
}
