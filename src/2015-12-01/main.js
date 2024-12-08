import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	first_enter_basement,
	floor,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const content = readFileSync(`${__dirname}/input.txt`, "utf8").trimEnd();

console.log(floor(content));
console.log(first_enter_basement(content));

