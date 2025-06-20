import {
	exec,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	exec(content).then(str => console.log(str));
}
