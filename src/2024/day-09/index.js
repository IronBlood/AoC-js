import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	compact_and_get_checksum1,
	compact_and_get_checksum2,
} from "./lib.js";

console.log(compact_and_get_checksum1(content));
console.log(compact_and_get_checksum2(content));

