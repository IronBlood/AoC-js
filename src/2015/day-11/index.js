import {
	gen_next,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	let password = content;
	console.log((password = gen_next(password)));
	console.log(gen_next(password));
}

