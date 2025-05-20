import {
	look_and_say,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	let str = content;
	for (let i = 0; i < 50; i++) {
		if (i === 40) {
			// part 1
			console.log(str.length);
		}
		str = look_and_say(str);
	}
	// part 2
	console.log(str.length);
}

