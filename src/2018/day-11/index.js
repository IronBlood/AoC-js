import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	largest_total_power_pos,
	largest_total_power,
} from "./lib.js";

console.log(largest_total_power_pos(+content));
console.log(largest_total_power(+content));

