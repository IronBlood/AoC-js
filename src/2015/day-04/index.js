import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const content = readFileSync(`${__dirname}/input.txt`, "utf8").trimEnd().split("\n");

import {
	mine_coin
} from "./lib.js";

console.log(mine_coin(content));
console.log(mine_coin(content, 6));

