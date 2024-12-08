import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

import {
	parse,
} from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd().split("\n");

/** @type {number[][]} */
const grid = Array.from({ length: 1000 }, () => Array(1000).fill(0));
content.forEach(cmd => {
	const [start, end, state] = parse(cmd);
	for (let i = start[0]; i <= end[0]; i++) {
		for (let j = start[1]; j <= end[1]; j++) {
			if (state === 2) { // toggle
				grid[i][j] = 1 - grid[i][j];
			} else {
				grid[i][j] = state;
			}
		}
	}
});
console.log(grid.reduce((sum, row) => sum + row.reduce((s, cell) => s + cell, 0), 0));

grid.forEach(row => row.fill(0));
content.forEach(cmd => {
	const [start, end, state] = parse(cmd);
	for (let i = start[0]; i <= end[0]; i++) {
		for (let j = start[1]; j <= end[1]; j++) {
			switch (state) {
				case 0: grid[i][j] = Math.max(grid[i][j] - 1, 0); break;
				case 1: grid[i][j]++; break;
				case 2: grid[i][j] += 2; break;
			}
		}
	}
});
console.log(grid.reduce((sum, row) => sum + row.reduce((s, cell) => s + cell, 0), 0));
