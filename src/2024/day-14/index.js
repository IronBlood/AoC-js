import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
	safety_factor,
} from "./lib.js";

/**
 * @param {string} content
 */
export function main(content) {
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
}
