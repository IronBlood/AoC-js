import {
	get_captcha,
} from "./lib.js";

export function main(content) {
	console.log(get_captcha(content));
	console.log(get_captcha(content, 2));
}
