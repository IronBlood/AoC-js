import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	lowest_score,
	count_tiles_bfs,
} from "./lib.js";

console.log(lowest_score(content));
console.log(count_tiles_bfs(content));

