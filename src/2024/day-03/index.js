import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	parse_and_calc,
	parse_and_calc_with_flags,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

console.log(parse_and_calc(content));
console.log(parse_and_calc_with_flags(content));

