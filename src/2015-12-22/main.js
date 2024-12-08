import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	least_mana,
} from "./lib.js";

const [b_hp, b_d] = content.split("\n").map(line => +line.split(": ")[1]);
console.log(least_mana({hp: 50, mana: 500}, {hp: b_hp, damage: b_d}));
console.log(least_mana({hp: 50, mana: 500}, {hp: b_hp, damage: b_d}, 2));

