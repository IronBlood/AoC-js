import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	look_and_say,
} from "./lib.js";

let str = content;
for (let i = 0; i < 50; i++) {
	str = look_and_say(str);
}
console.log(str.length);

