import { IntcodeVM } from "../common/IntcodeVM.js";

/**
 * @param {string} data
 * @param {[number, number] | undefined} adjust
 */
export const get_pos0 = (data, adjust) => {
	const integers = data.split(",").map(Number);
	const vm = new IntcodeVM(integers, adjust);
	vm.run();
	return vm.get_memory(0);
};

/**
 * @param {string} data
 */
export const get_pair = (data) => {
	let val;
	for (let i = 0; i <= 99; i++) {
		for (let j = 0; j <= 99; j++) {
			if (get_pos0(data, [i, j]) === 19690720) {
				return 100 * i + j;
			}
		}
	}
	return -1;
};
