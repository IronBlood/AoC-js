import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	count_houses,
	count_houses_with_robo,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const content = readFileSync(`${__dirname}/input.txt`, "utf8").trimEnd();

console.log(count_houses(content));
console.log(count_houses_with_robo(content));

