import {
	get_code,
} from "./lib.js";

export function main(content) {
	const match = content.match(/row (\d+), column (\d+)/);
	const row = Number(match[1]), col = Number(match[2]);

	console.log(get_code(row, col));
}
