import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	exec,
} from "./lib.js";

const registers = new Int32Array(4);
registers[0] = 7;
console.log(exec(content, registers));
registers.fill(0);
registers[0] = 12;
console.log(exec(content, registers, 2));

