import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	make_a_cookie,
	make_a_cookie_with_fixed_calorie,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd().split("\n");

console.log(make_a_cookie(content));
console.log(make_a_cookie_with_fixed_calorie(content, 500));

