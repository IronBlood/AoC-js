import {
	find_aunt_sue,
} from "./lib.js";

const targeting = `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`;

export function main(content) {
	console.log(find_aunt_sue(content, targeting));
	console.log(find_aunt_sue(content, targeting, 2));
}
