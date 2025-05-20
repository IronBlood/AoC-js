import {
	count_presents_by_houseid,
	count_presents_by_houseid2,
} from "./lib.js";

export function main(content) {
	let id = 1;
	let target = +content;

	while (count_presents_by_houseid(id) < target) {
		id++;
	}
	console.log(id);

	id = 1;
	while (count_presents_by_houseid2(id) < target) {
		id++;
	}
	console.log(id);
}
