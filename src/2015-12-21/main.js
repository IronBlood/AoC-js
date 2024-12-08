import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	win_with_least_gold,
	lose_with_most_gold,
} from "./lib.js";

console.log(win_with_least_gold(content));
console.log(lose_with_most_gold(content));
