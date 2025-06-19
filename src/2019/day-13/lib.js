import {
	IntcodeVM,
	STEP_EVENT,
} from "../common/IntcodeVM.js";

/**
 * @readonly
 * @enum {number}
 */
const TILE = {
	EMPTY:   0,
	WALL:    1,
	BLOCK:   2,
	HPADDLE: 3,
	BALL:    4,
};

/**
 * @param {GameStatus} status
 */
const draw = (status) => {
	/** @type {{ pos: [number, number], type: number}[]} */
	const tiles = [];
	let min_x = Number.MAX_SAFE_INTEGER,
		min_y = Number.MAX_SAFE_INTEGER,
		max_x = Number.MIN_SAFE_INTEGER,
		max_y = Number.MIN_SAFE_INTEGER;

	for (const [k, type] of status.wall_block_map.entries()) {
		const pos = k.split(",").map(Number);
		tiles.push({ pos, type });

		min_x = Math.min(min_x, pos[0]);
		min_y = Math.min(min_y, pos[1]);
		max_x = Math.max(max_x, pos[0]);
		max_y = Math.max(max_y, pos[1]);
	}
	if (status.ball_pos) {
		tiles.push({ pos: status.ball_pos, type: TILE.BALL });
	}
	if (status.hpaddle_pos) {
		tiles.push({ pos: status.hpaddle_pos, type: TILE.HPADDLE });
	}

	const X = max_x - min_x + 1, Y = max_y - min_y + 1;

	/** @type {string[][]} */
	const grid = Array.from({ length: Y }, () => Array(X).fill(" "));

	for (const { pos, type } of tiles) {
		let char = " ";
		switch (type) {
			case TILE.WALL:    char = "X"; break;
			case TILE.BLOCK:   char = "O"; break;
			case TILE.HPADDLE: char = "-"; break;
			case TILE.BALL:    char = "."; break;
		}
		grid[pos[1] - min_y][pos[0] - min_x] = char;
	}

	console.log(grid.map(row => row.join("")).join("\n"));
};

/**
 * @typedef {Object} GameStatus
 * @property {number} score
 * @property {Map<string, TILE>} wall_block_map
 * @property {[number, number]?} ball_pos
 * @property {[number, number]?} hpaddle_pos
 */

/**
 * @param {GameStatus} status
 * @param {number[]} nums
 */
const update_status = (status, nums) => {
	for (let i = 0, len = nums.length; i < len; i += 3) {
		const pos = `${nums[i]},${nums[i+1]}`, type = nums[i+2];

		if (pos === "-1,0") {
			status.score = type;
			continue;
		}

		if (type === TILE.HPADDLE) {
			status.hpaddle_pos = [nums[i], nums[i+1]];
			continue;
		}

		if (type === TILE.BALL) {
			status.ball_pos = [nums[i], nums[i+1]];
			continue;
		}

		status.wall_block_map.set(pos, type);
	}
};

/**
 * @param {string} data
 */
export const exec = (data, part = 1) => {
	const program = data.split(",").map(Number);
	if (part === 2) {
		program[0] = 2;
	}

	const vm = new IntcodeVM(program);

	/** @type {GameStatus} */
	let x = {
		score: 0,
		wall_block_map: new Map(),
	};

	if (part === 1) {
		vm.run();
		const output = vm.output;
		if (output.length % 3 !== 0) {
			throw new Error(`invalid length, ${output.length}`);
		}

		update_status(x, output);

		let count = 0;
		for (const [k, type] of x.wall_block_map) {
			if (type === TILE.BLOCK) {
				count++;
			}
		}
		return count;
	}

	if (part === 2) {
		let halted = false;
		/** @type {number[]} */
		const output = [];
		while (!halted) {
			const res = vm.run_until_event();
			switch (res.type) {
				case STEP_EVENT.OUTPUT:
					output.push(res.value);
					break;
				case STEP_EVENT.INPUT_NEEDED: {
					update_status(x, output);
					output.length = 0;

					if (!x.ball_pos || !x.hpaddle_pos) {
						throw new Error(`positions for ball and hpaddle are needed`);
					}

					const bx = x.ball_pos[0], px = x.hpaddle_pos[0];
					const input = bx === px
						? 0
						: bx < px
						? -1
						: 1;
					vm.push_input(input);

					break;
				}
				case STEP_EVENT.HALTED:
					halted = true;
					break;
			}
		}

		if (output.length > 0) {
			update_status(x, output);
		}

		return x.score;
	}
};
