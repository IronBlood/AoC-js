import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	is_safe,
	is_safe2,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd().split("\n");

console.log(content.reduce((sum, curr) => sum + (is_safe(curr) ? 1 : 0), 0));
console.log(content.reduce((sum, curr) => sum + (is_safe2(curr) ? 1 : 0), 0));

