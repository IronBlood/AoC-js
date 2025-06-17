import { IntcodeVM } from "../common/IntcodeVM.js";

/**
 * @param {string} data
 */
export const get_boost_keycode = (data, part = 1) => {
	const integers = data.split(",").map(Number);
	const vm = new IntcodeVM(integers);
	vm.push_input(part);
	vm.run();

	const output = vm.output;

	const sum = output.reduce((s, x) => s + x, 0);
	if (output.length === 0 || sum !== output[output.length - 1]) {
		console.log("didn't pass test");
	}
	return sum;
};
