import fs from "node:fs";
import path from "node:path";

import "dotenv/config";

/**
 * @param {string} folderPath
 */
function create_folder(folderPath) {
	if (!fs.existsSync(folderPath)) {
		console.log(`Creating folder ${folderPath}`);
		fs.mkdirSync(folderPath, { recursive: true });
	} else {
		console.log(`Folder ${folderPath} exists, skipping creation...`);
	}
}

/**
 * @param {string} filePath file path
 * @param {string} content the content to write to file
 */
function create_file(filePath, content) {
	if (!fs.existsSync(filePath)) {
		console.log(`Creating ${filePath}`);
		fs.writeFileSync(filePath, content, "utf8");
	} else {
		console.log(`Skipping ${filePath}`);
	}
}

/**
 * @param {string} folderPath
 */
function create_index(folderPath) {
	const filePath = path.join(folderPath, "index.js");
	const content = [
		`import {\n} from "./lib.js";`,
		"",
		"/**",
		" * @param {string} content",
		" */",
		"export function main(content) {",
		"}\n",
	].join("\n");
	create_file(filePath, content);
}

/**
 * @param {string} folderPath
 */
function create_lib(folderPath) {
	const filePath = path.join(folderPath, "lib.js");
	const content = "\n";
	create_file(filePath, content);
}

/**
 * @param {string} folderPath
 */
function create_test(folderPath) {
	const filePath = path.join(folderPath, "lib.test.js");
	const content = "import { describe, it, expect } from '@jest/globals';\nimport {\n} from \"./lib.js\";\n\n\n";
	create_file(filePath, content);
}

/**
 * @param {string} folderPath
 * @param {number} year
 * @param {number} day
 */
async function fetch_input(folderPath, year, day) {
	const filePath = path.join(folderPath, "input.txt");
	if (fs.existsSync(filePath)) {
		console.log(`Skipping ${filePath}`)
		return;
	}

	const url = `https://adventofcode.com/${year}/day/${day}/input`;
	const res = await fetch(url, {
		headers: {
			cookie: process.env.COOKIE || "",
		},
	});
	if (!res.ok) {
		console.log("Failed to fetch input");
		return;
	}
	const text = await res.text();
	create_file(filePath, text);
}

/**
 * @param {string} year
 * @param {string} day
 */
export async function scaffolding(year, day) {
	const folderPath = path.join("src", year, `day-${day}`);
	create_folder(folderPath);
	create_index(folderPath);
	create_lib(folderPath);
	create_test(folderPath);
	await fetch_input(folderPath, +year, +day);
}
