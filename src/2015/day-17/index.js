import {
	fill_containers,
	minimum,
} from "./lib.js";

export function main(content) {
	const containers = content.split("\n").map(Number);
	console.log(fill_containers(containers, 150));
	console.log(minimum(containers, 150));
}
