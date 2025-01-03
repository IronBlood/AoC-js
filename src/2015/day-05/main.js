import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	is_nice,
	is_nice2,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd().split("\n");

console.log(content.reduce((sum, curr) => sum + is_nice(curr), 0));
console.log(content.reduce((sum, curr) => sum + is_nice2(curr), 0));

