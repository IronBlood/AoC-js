import {
	count_real_rooms,
	find_storage,
} from "./lib.js";

export function main(content) {
	console.log(count_real_rooms(content));
	console.log(find_storage(content));
}
