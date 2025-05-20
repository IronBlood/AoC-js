import {
	possible_molecules,
	reduce,
} from "./lib.js";

export function main(content) {
	console.log(possible_molecules(content));
	console.log(reduce(content));
}

