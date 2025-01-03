import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	get_all,
	get_all_2_linkedlist,
} from "./lib.js";

console.log(get_all(+content));
console.log(get_all_2_linkedlist(+content));

