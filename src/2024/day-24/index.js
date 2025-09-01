import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
	gen_graph,
	get_decimal,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(get_decimal(content));
	writeFileSync(`${__dirname}/graph.dot`, gen_graph(content), { encoding: "utf8" });
}
