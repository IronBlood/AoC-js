import {
	win_with_least_gold,
	lose_with_most_gold,
} from "./lib.js";

export function main(content) {
	console.log(win_with_least_gold(content));
	console.log(lose_with_most_gold(content));
}
