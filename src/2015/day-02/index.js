import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	total_ribbon,
	total_square,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const content = readFileSync(`${__dirname}/input.txt`, "utf8").trimEnd().split("\n");

console.log(content.reduce((sum, curr) => sum + total_square(curr), 0));
console.log(content.reduce((sum, curr) => sum + total_ribbon(curr), 0));

