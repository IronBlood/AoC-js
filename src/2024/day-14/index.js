import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();
import {
	safety_factor,
} from "./lib.js";

console.log(safety_factor(content, {
	x: 101,
	y: 103,
	second: 100,
}));

safety_factor(content, {
	x: 101,
	y: 103,
	second: 10000,
	dump_image: true,
	dir: __dirname,
});

