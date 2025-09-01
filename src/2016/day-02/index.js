import {
	get_code,
	get_code2,
} from "./lib.js";

export function main(content) {
	console.log(get_code(content));
	console.log(get_code2(content));
}
