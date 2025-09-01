import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
	count_pairs,
	print_canvas,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
	console.log(count_pairs(content));
	print_canvas(content, `${__dirname}/${new Date().getTime()}.png`);
}
