import {
	count_lights,
} from "./lib.js";

export function main(content) {
	console.log(count_lights(content, 100));
	console.log(count_lights(content, 100, 2));
}

