import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	min_steps,
	first_block,
} from "./lib.js";

console.log(min_steps(content, 1024, [70, 70]));
console.log(first_block(content, [70,70]));

