import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	get_code,
} from "./lib.js";

const match = content.match(/row (\d+), column (\d+)/);
const row = Number(match[1]), col = Number(match[2]);

console.log(get_code(row, col));

