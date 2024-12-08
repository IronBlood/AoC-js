import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	count_blocks,
	count_blocks_HQ,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

console.log(count_blocks(content));
console.log(count_blocks_HQ(content));

