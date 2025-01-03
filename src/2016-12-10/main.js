import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input_filename = `${__dirname}/input.txt`;
const content = readFileSync(input_filename, "utf8").trimEnd();

import {
	simulate,
} from "./lib.js";

let part_1_id = null;
let outputs = [];
simulate(content, {
	check_robot: (r) => {
		if (r.values.join(",") == "17,61" && part_1_id == null) {
			part_1_id = r.id;
		}
	},
	handle_outputs: (id, value) => {
		outputs[+id] = value;
	},
});
console.log(part_1_id);
console.log(outputs, outputs[0] * outputs[1] * outputs[2]);

