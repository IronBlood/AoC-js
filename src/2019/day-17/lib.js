import {
	IntcodeVM,
} from "../common/IntcodeVM.js";

/**
 * @param {string|string[][]} grid
 */
export const sum_alignment = (grid) => {
	if (typeof grid === "string") {
		grid = grid.split("\n").map(line => line.split(""));
	}

	let sum = 0;
	for (let i = 1, H = grid.length, W = grid[0].length; i < H - 1; i++) {
		for (let j = 1; j < W - 1; j++) {
			if (grid[i-1][j] === "#" &&
				grid[i+1][j] === "#" &&
				grid[i][j-1] === "#" &&
				grid[i][j+1] === "#" &&
				grid[i][j] === "#") {
				sum += i * j;
			}
		}
	}

	return sum;
}

/**
 * @param {string} data
 */
export const get_sum = (data) => {
	const vm = new IntcodeVM(data.split(",").map(Number));
	vm.run();

	const graph = vm.output.map(x => String.fromCharCode(x)).join("");

	return {
		graph,
		sum: sum_alignment(graph),
	};
};

/**
 * @param {string} data
 * @param {string} cmd
 */
export const get_dust = (data, cmd) => {
	const program = data.split(",").map(Number);
	program[0] = 2;
	const vm = new IntcodeVM(program);

	for (let i = 0; i < cmd.length; i++) {
		vm.push_input(cmd.charCodeAt(i));
	}

	vm.run();

	return vm.output[vm.output.length - 1];
};
