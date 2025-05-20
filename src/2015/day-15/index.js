import {
	make_a_cookie,
	make_a_cookie_with_fixed_calorie,
} from "./lib.js";

export function main(content) {
	const lines = content.split("\n");
	console.log(make_a_cookie(lines));
	console.log(make_a_cookie_with_fixed_calorie(lines, 500));
}

