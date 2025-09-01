import {
	simulate,
} from "./lib.js";

export function main(content) {
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
}
