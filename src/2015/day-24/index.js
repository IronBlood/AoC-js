import {
	get_quantum,
} from "./lib.js";

export function main(content) {
	console.log(get_quantum(content));
	console.log(get_quantum(content, 4));
}
