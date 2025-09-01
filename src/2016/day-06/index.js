import {
	get_message,
} from "./lib.js";

export function main(content) {
	console.log(get_message(content));
	console.log(get_message(content, 2));
}
