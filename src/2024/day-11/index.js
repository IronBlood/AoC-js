import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	stones_after_blinks_optimized,
} from "./lib.js";

console.log(stones_after_blinks_optimized(content, 25));
console.log(stones_after_blinks_optimized(content, 75));

