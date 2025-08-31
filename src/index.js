import { readFile } from "node:fs/promises";
import path from "node:path";

import { scaffolding } from "./scaffolding.js";

export async function main() {
	const args = process.argv.slice(2);
	if (args.length < 1) {
		console.log("Usage: node index.js <year>-<day>");
		console.log("for example: node index.js 2015-01");
		console.log("Or, to initialize source & test for a new day:")
		console.log("             node index.js 2015-01 s");
		process.exit(0);
	}

	const [dateArg, action] = args;
	const match = /^(\d{4})-(\d{2})$/.exec(dateArg);
	if (!match) {
		console.log("Invalid format. Expected input like '2015-01'");
		process.exit(1);
	}

	const [, year, day] = match;
	const yearNum = +year;
	const dayNum = +day;

	if (yearNum < 2015 || yearNum > 2024) {
		console.log("Year must be between 2015 and 2024");
		process.exit(1);
	}

	if (action === "scaffolding" || action === "s") {
		await scaffolding(year, day);
		process.exit(0);
	}

	const folder    = path.join("src", year, `day-${day}`);
	const inputPath = path.join(folder, "input.txt");
	let inputData;

	try {
		const raw = await readFile(inputPath, "utf-8");
		inputData = raw.trimEnd();
	} catch (err) {
		console.error(`Cannot open input file at "${inputPath}": ${err.message}`);
		process.exit(1);
	}

	let dayMod;
	try {
		const filePath = `./${year}/day-${day}/index.js`;
		dayMod = await import(filePath);
	} catch (err) {
		console.error("Module not found", err);
		process.exit(1);
	}

	const main = dayMod.default ?? dayMod.main;
	if (typeof main === "function") {
		main(inputData);
	} else {
		console.log("Module doesn't return a callable 'main' function");
		process.exit(1);
	}
}

