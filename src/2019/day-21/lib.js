import {
	IntcodeVM,
	STEP_EVENT,
} from "../common/IntcodeVM.js";

import {
	CMD_WALK,
	CMD_RUN,
} from "./cheat.js";

/**
 * @param {number[]} output
 */
const dump_output = (output) => console.log(output.map(x => String.fromCharCode(x)).join(""));
/**
 * @param {string} data
 */
export const hull_damage = (data, part = 1) => {
	const program = data.split(",").map(Number);
	const vm = new IntcodeVM(program);
	/** @type {number[]} */
	const output = [];
	let halt = false;

	const CMD = part === 1 ? CMD_WALK : CMD_RUN;

	while (!halt) {
		const step = vm.run_until_event();
		switch (step.type) {
			case STEP_EVENT.OUTPUT:
				output.push(step.value);
				break;
			case STEP_EVENT.INPUT_NEEDED:
				dump_output(output);
				output.length = 0;
				for (let i = 0; i < CMD.length; i++) {
					vm.push_input(CMD.charCodeAt(i));
				}
				break;
			case STEP_EVENT.HALTED:
				halt = true;
		}
	}

	let res = output.pop();
	dump_output(output);
	return res;
};
