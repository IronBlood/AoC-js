import {
	STEP_EVENT,
	IntcodeVM,
} from "../common/IntcodeVM.js";

/**
 * @param {string} data
 * @param {number} [part]
 */
export const exec = (data, part = 1) => {
	const program = data.split(",").map(Number);
	const vm = new IntcodeVM(program);

	/** @type {number[]} */
	const output = [];

	/** @type {Map<string, 0|1>} */
	const painted_map = new Map();

	const DIRECTIONS = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1],
	];
	let dir_idx = 0;

	const pos = [0, 0];
	if (part === 2) {
		painted_map.set(pos.join(","), 1);
	}

	let halted = false;

	const move = () => {
		if (output.length !== 2) {
			throw new Error(`invalid output length, expected 2, got ${output.length}`);
		}

		// paint
		painted_map.set(pos.join(","), output[0]);

		// update direction
		dir_idx = (dir_idx + (output[1] === 0 ? 3 : 1)) % 4;

		// move forward
		const [dx, dy] = DIRECTIONS[dir_idx];
		pos[0] += dx;
		pos[1] += dy;

		// clean output
		output.length = 0;
	};

	while (!halted) {
		const res = vm.run_until_event();

		switch (res.type) {
			case STEP_EVENT.HALTED:
				halted = true;
				break;
			case STEP_EVENT.OUTPUT:
				output.push(res.value);
				if (output.length === 2) {
					move();
				}
				break;
			case STEP_EVENT.INPUT_NEEDED:
				const pos_str = pos.join(",");
				const value = painted_map.get(pos_str) || 0;
				vm.push_input(value);
				break;
			default:
				throw new Error(`invalid type: ${res.type}`);
		}
	}

	if (part === 1)
		return painted_map.size;

	let min_x = Number.MAX_SAFE_INTEGER,
		max_x = Number.MIN_SAFE_INTEGER,
		min_y = Number.MAX_SAFE_INTEGER,
		max_y = Number.MIN_SAFE_INTEGER;

	/** @type {number[][]} */
	const white_panels = [];
	for (const [k, v] of painted_map.entries()) {
		if (v === 0)
			continue;

		const [x, y] = k.split(",").map(Number);

		min_x = Math.min(min_x, x);
		max_x = Math.max(max_x, x);
		min_y = Math.min(min_y, y);
		max_y = Math.max(max_y, y);

		white_panels.push([x, y]);
	}

	const X = max_x - min_x + 1, Y = max_y - min_y + 1;

	const grid = Array.from({ length: X }, () => Array(Y).fill("."));
	for (const [x, y] of white_panels) {
		grid[x - min_x][y - min_y] = "#";
	}

	return grid.map(row => row.join("")).join("\n");
};

