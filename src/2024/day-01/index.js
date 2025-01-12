import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";
import { total_distance, total_similarity } from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").split("\n");

const arr1 = [], arr2 = [];
for (const line of content) {
	if (line && line.length > 0) {
		const arr = line.split("   ");
		if (arr.length != 2) {
			break;
		}

		arr1.push(+arr[0]);
		arr2.push(+arr[1]);
	}
}

console.log(total_distance(arr1, arr2));
console.log(total_similarity(arr1, arr2));

