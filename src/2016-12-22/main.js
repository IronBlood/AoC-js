import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	count_pairs,
	print_canvas,
} from "./lib.js";

console.log(count_pairs(content));
print_canvas(content, `${__dirname}/${new Date().getTime()}.png`);

