import {
	exec,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	const registers = new Int32Array(4);
	registers[0] = 7;
	console.log(exec(content, registers));
	registers.fill(0);
	registers[0] = 12;
	console.log(exec(content, registers, 2));
}
