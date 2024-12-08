import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	count_presents_by_houseid,
	count_presents_by_houseid2,
} from "./lib.js";

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

