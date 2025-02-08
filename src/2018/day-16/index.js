import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

const [part1, part2] = content.split("\n\n\n\n");

import {
	count_three_opcodes,
	get_reg0,
} from "./lib.js";

console.log(count_three_opcodes(part1));
console.log(get_reg0(part1, part2));

