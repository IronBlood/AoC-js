import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	count_word,
	count_x,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

console.log(count_word(content, "XMAS"));
console.log(count_x(content, "MAS"));

