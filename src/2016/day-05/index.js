import {
	find_pw,
} from "./lib.js";

export function main(content) {
	console.log(find_pw(content));
	console.log(find_pw(content, 2));
}
