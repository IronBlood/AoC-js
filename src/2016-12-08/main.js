import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	count_pixels_after_execution,
} from "./lib.js";

/** @type {string[][]} */
const screen = Array.from({ length: 6 }, () => Array(50).fill("."));
console.log(count_pixels_after_execution(screen, content));

