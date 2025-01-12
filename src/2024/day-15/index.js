import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();
import {
	sum_of_gps_coordinates,
	sum_of_gps_coordinates_2,
} from "./lib.js";

console.log(sum_of_gps_coordinates(content));
console.log(sum_of_gps_coordinates_2(content));

