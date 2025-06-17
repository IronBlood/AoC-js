import {
	IntcodeVM,
	STEP_EVENT,
} from "../common/IntcodeVM.js";

/**
 * @param {string} data
 */
export const get_diagnostic_code = (data, part = 1) => {
	const integers = data.split(",").map(Number);

	const input = part === 1 ? 1 : 5;

	const vm = new IntcodeVM(integers);
	vm.push_input(input);

	vm.run();

	const outputs = vm.output;
	const sum = outputs.reduce((s, x) => s + x, 0);
	if (outputs.length === 0 || sum !== outputs[outputs.length - 1]) {
		console.log("didn't pass test");
	}
	return sum;
};

