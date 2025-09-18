// @ts-check

import {
	BlockMinus,
	BlockPlus,
	BlockL,
	BlockPipe,
	BlockSquare,
} from "./blocks.js";

/**
 * @typedef {BlockMinus | BlockPlus | BlockL | BlockPipe | BlockSquare} CommonBlocks
 */

class TetrisSimulator {
	/**
	 * @param {string} line
	 */
	constructor(line) {
		/** @type {number} */
		this.block_type = 0;
		/** @type {number} */
		this.tallest = 0;
		/** @type {Set<string>} */
		this.rested_tiles = new Set();
		this.rested_blocks = 0;

		/** @private @type {number[]} */
		this.tallests = Array(7).fill(0);

		/** @private @type {(-1|1)[]} */
		this.instructions = line.split("").map(c => c === "<" ? -1 : 1);
		/** @private @type {number} */
		this.ptr = 0;
		/** @private @readonly @type {number} */
		this.ptr_len = this.instructions.length;
		/** @type {CommonBlocks} */
		this.curr_block = this._create_block();
	}

	/**
	 * @private
	 * @returns {CommonBlocks}
	 */
	_create_block() {
		let curr_block;
		/** @type {[number, number]} */
		const initial_position = [this.tallest + 3, 2];
		switch (this.block_type) {
			case 0:
				curr_block = new BlockMinus(initial_position);
				break;
			case 1:
				curr_block = new BlockPlus(initial_position);
				break;
			case 2:
				curr_block = new BlockL(initial_position);
				break;
			case 3:
				curr_block = new BlockPipe(initial_position);
				break;
			case 4:
				curr_block = new BlockSquare(initial_position);
				break;
			default:
				throw new Error(`unsupported block type ${this.block_type}`);
		}
		this.block_type = (this.block_type + 1) % 5;
		return curr_block;
	}

	step() {
		while (true) {
			const direction = this.instructions[this.ptr++];
			this.ptr %= this.ptr_len;

			let next_positions;
			if (direction < 0) {
				next_positions = this.curr_block.pseudo_move_left();
			} else {
				next_positions = this.curr_block.pseudo_move_right();
			}

			let can_move = true;
			for (const tile of next_positions) {
				const y = tile[1];
				if (y < 0 || y >= 7) {
					can_move = false;
					break;
				}
				const pos = tile.join(",");
				if (this.rested_tiles.has(pos)) {
					can_move = false;
					break;
				}
			}

			if (can_move) {
				if (direction < 0) {
					this.curr_block.move_left();
				} else {
					this.curr_block.move_right();
				}
			}

			can_move = true;
			next_positions = this.curr_block.pseudo_move_down();
			for (const tile of next_positions) {
				const x = tile[0];
				if (x < 0) {
					can_move = false;
					break;
				}
				const pos = tile.join(",");
				if (this.rested_tiles.has(pos)) {
					can_move = false;
					break;
				}
			}

			if (can_move) {
				this.curr_block.move_down();
			} else {
				this.curr_block.get_tiles().forEach(pos => {
					const [row, col] = pos;
					this.tallests[col] = Math.max(this.tallests[col], row + 1);
					this.rested_tiles.add(pos.join(","));
				});
				this.tallest = Math.max(...this.tallests);
				this.rested_blocks++;

				this.curr_block = this._create_block();
				break;
			}
		}
	}

	/**
	 * @deprecated
	 * @private
	 */
	get_fingerprint() {
		const smallest = Math.min(...this.tallests);
		return this.tallests.map(x => x - smallest).join("");
	}
}

/**
 * @param {Set<string>} set
 */
const visualize = (set) => {
	const positions = [...set].map(str => str.split(",").map(Number));
	let max_x = 0;
	positions.forEach(p => max_x = Math.max(max_x, p[0]));
	const H = max_x + 1, W = 7;
	const grid = Array.from({ length: H }, () => Array(W).fill("."));
	positions.forEach(([x, y]) => grid[max_x - x][y] = "#");
	console.log(grid.map(row => row.join("")).join("\n"));
};

// This magic number assumes it's enough to find the periodic patterns (will be used to check three periods),
// increase it if it doesn't fit your case
const MAGIC = 6000;

/**
 * @template T
 * @param {T[]} arr
 * @param {number} seg_len
 * @param {number} a
 * @param {number} b
 * @param {number} c
 */
const is_same_arr = (arr, seg_len, a, b, c) => {
	for (let i = 0; i < seg_len; i++) {
		const el_a = arr[a + i];
		const el_b = arr[b + i];
		const el_c = arr[c + i];
		if (el_a !== el_b || el_b !== el_c)
			return false;
	}
	return true;
};

/**
 * @param {string} data
 */
export const get_height = (data, blocks = 2022) => {
	const sim = new TetrisSimulator(data);
	let calc_blocks = blocks;
	if (calc_blocks > MAGIC) {
		calc_blocks = MAGIC;
	}

	const memo = Array(MAGIC + 1);
	memo[0] = 0;

	while (sim.rested_blocks < calc_blocks) {
		sim.step();
		memo[sim.rested_blocks] = sim.tallest;
	}

	// part 1
	if (calc_blocks < MAGIC)
		return sim.tallest;

	const deltas = Array.from({ length: MAGIC - 1 }, (_, idx) => memo[idx+1] - memo[idx]);
	let repeat_len = 10;

	for (; repeat_len < calc_blocks / 3; repeat_len++) {
		const c = MAGIC - 1 - repeat_len;
		const b = c - repeat_len;
		const a = b - repeat_len;
		if (is_same_arr(deltas, repeat_len, a, b, c))
			break;
	}

	// console.log(repeat_len);

	let j = MAGIC - 2, i = j - 3 * repeat_len;
	while (deltas[i] === deltas[j]) {
		i--;
		j--;
	}
	// console.log(i);

	const prefix_len = i + 1;
	const prefix_height = memo[prefix_len];
	const cycle_height = memo[prefix_len + repeat_len] - prefix_height;

	const remaining = blocks - prefix_len;
	const cycles = Math.floor(remaining / repeat_len);
	const leftover = remaining % repeat_len;
	const leftover_height = memo[prefix_len + leftover] - memo[prefix_len];

	return prefix_height + cycle_height * cycles + leftover_height;
};
