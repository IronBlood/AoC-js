import {
	IntcodeVM,
} from "../common/IntcodeVM.js";

/**
 * @param {number[]} program
 * @param {number} x
 * @param {number} y
 */
const is_pulled = (program, x, y) => {
	const vm = new IntcodeVM(program);
	vm.push_input(x);
	vm.push_input(y);
	vm.run();

	return vm.output[0];
};

/**
 * @param {string} data
 */
export const get_points = (data) => {
	const program = data.split(",").map(Number);
	/** @type {(0|1)[][]} */
	const grid = Array.from({ length: 50 }, () => Array(50).fill(0));

	let sum = 0;
	for (let i = 0; i < 50; i++) {
		for (let j = 0; j < 50; j++) {
			sum += (grid[j][i] = is_pulled(program, i, j));
		}
	}

	// console.log(grid.map(row => row.map(x => x ? "#" : ".").join("")).join("\n"));

	return sum;
};

/**
 * @param {string} data
 */
export const find_beam_square = (data, size = 100) => {
	const program = data.split(",").map(Number);
	let x_start = 0;

	for (let y = size - 1; ; y++) {
		let x = x_start;
		while (!is_pulled(program, x, y)) {
			x++;
		}
		x_start = x;

		const top_y = y - (size - 1);
		if (is_pulled(program, x + size - 1, top_y)) {
			return x * 10000 + top_y;
		}
	}
};

