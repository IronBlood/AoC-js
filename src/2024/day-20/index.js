import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	count_cheats_by_saving,
} from "./lib.js";

console.log(count_cheats_by_saving(content, 2, 100));
console.log(count_cheats_by_saving(content, 20, 100));

