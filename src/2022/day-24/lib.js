// @ts-check

import {
	PriorityQueue,
} from "@datastructures-js/priority-queue";
import { lcm } from "../../lib/math.js";

/**
 * @typedef {import("./types").Direction} Direction
 * @typedef {import("./types").Blizzard} Blizzard
 * @typedef {import("./types").BlizzardState} BlizzardState
 * @typedef {import("./types").MoveState} MoveState
 */

/** @type {(x: any) => x is Direction} */
export const is_direction = (x) => /[>v<\^]/.test(x);

/**
 * @param {string[][]} grid
 */
const parse_blizzards = (grid) => {
	/** @type {Blizzard[]} */
	const blizzards = [];

	const H = grid.length, W = grid[0].length;
	for (let i = 1; i < H - 1; i++) {
		for (let j = 1; j < W - 1; j++) {
			const c = grid[i][j];
			if (is_direction(c)) {
				blizzards.push([i, j, c]);
			}
		}
	}

	return blizzards;
}

/**
 * @param {Blizzard[]} arr
 * @param {number} H
 * @param {number} W
 */
const get_set = (arr, H, W) => {
	/** @type {(0|1)[]} */
	const set = Array(H * W).fill(0);
	arr.forEach(([x, y]) => set[hash_position(x, y, W)] = 1);
	return set;
};

/**
 * @param {number} x row
 * @param {number} y col
 * @param {number} W width
 */
const hash_position = (x, y, W) => x * W + y;

/**
 * @type {Record<Direction, [number, number]>}
 */
const vectors = {
	"^": [-1, 0],
	">": [0, 1],
	"v": [1, 0],
	"<": [0, -1],
};

/**
 * @param {BlizzardState} state
 * @param {number} H
 * @param {number} W
 * @returns {Blizzard[]}
 */
const move_blizzards = (state, H, W) => {
	/** @type {Blizzard[]} */
	const arr = [];
	for (const [x, y, d] of state.arr) {
		const [dx, dy] = vectors[d];
		let nx = x + dx;
		let ny = y + dy;

		// entering up boundry
		if (nx === 0) {
			nx = H - 2;
		}
		// entering bottom boundry
		if (nx === H - 1) {
			nx = 1;
		}
		// entering left boundry
		if (ny === 0) {
			ny = W - 2;
		}
		// entering right boundry
		if (ny === W - 1) {
			ny = 1;
		}

		arr.push([nx, ny, d]);
	}

	return arr;
};

class HistoricalBlizzard {
	/**
	 * @param {string[][]} grid
	 */
	constructor(grid) {
		this.H = grid.length;
		this.W = grid[0].length;
		this.period = lcm(this.H - 2, this.W - 2);
		this.init_blizzards = parse_blizzards(grid);
		this.init_set = get_set(this.init_blizzards, this.H, this.W);
		/** @type {Map<number, BlizzardState>} */
		this.map = new Map([[0, { arr: this.init_blizzards, set: this.init_set }]]);
	}

	/**
	 * @param {number} minutes
	 * @returns {BlizzardState}
	 */
	get_by_minutes(minutes) {
		minutes %= this.period;
		let res = this.map.get(minutes);

		if (!res) {
			const arr = move_blizzards(this.get_by_minutes(minutes - 1), this.H, this.W);
			const set = get_set(arr, this.H, this.W);
			res = { arr, set };
			this.map.set(minutes, res);
		}

		return res;
	}
}

/**
 * @param {MoveState} state
 * @param {number} target_x
 * @param {number} target_y
 */
const state_score = (state, target_x, target_y) => {
	const [x, y] = state.position;
	return state.minutes + manhattan(x, y, target_x, target_y);
};

/**
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
const manhattan = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

/**
 * @param {string} data
 * @returns {number}
 */
export const fewest_minutes = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	const H = grid.length, W = grid[0].length;
	const L = lcm(H - 2, W - 2);
	const target_x = H - 1;
	const target_y = W - 2;

	/** @type {Set<string>} */
	const visited = new Set();

	const histories = new HistoricalBlizzard(grid);
	let global_best = Infinity;

	/** @type {PriorityQueue<MoveState>} */
	const pq = new PriorityQueue((a, b) => state_score(a, target_x, target_y) - state_score(b, target_x, target_y));

	pq.enqueue({
		position: [0, 1],
		minutes: 0,
		stage: 0, // unused for part 1
	});

	const directions = [0, 1, 0, -1, 0];

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	while (pq.size() > 0) {
		const state = pq.dequeue();
		if (!state) {
			throw new Error("never");
		}

		const [x, y] = state.position;

		// if reach the end
		if (x === target_x && y === target_y) {
			global_best = Math.min(global_best, state.minutes);
			continue;
		}

		const minimum_minutes_required = manhattan(x, y, target_x, target_y);
		if (state.minutes + minimum_minutes_required > global_best) {
			// no need to check
			continue;
		}

		const key = [x, y, state.minutes % L].join(",");
		if (visited.has(key)) {
			continue;
		}
		visited.add(key);

		const nm = state.minutes + 1;
		const { set } = histories.get_by_minutes(nm);

		// check move
		for (let i = 0; i < 4; i++) {
			const nx = x + directions[i];
			const ny = y + directions[i + 1];

			// out of grid or jump into wall
			if (!in_grid(nx, ny) || grid[nx][ny] === "#") {
				continue;
			}

			const hash = hash_position(nx, ny, W);
			// taken by blizzards
			if (set[hash]) {
				continue;
			}

			pq.enqueue({
				position: [nx, ny],
				minutes: nm,
				stage: 0, // unused for part 1
			});
		}
		// check stay
		const hash = hash_position(x, y, W);
		if (!set[hash]) {
			pq.enqueue({
				position: [x, y],
				minutes: nm,
				stage: 0, // unused for part 1
			});
		}
	}

	return global_best;
};
/**
 * @param {string} data
 * @returns {number}
 */
export const fewest_minutes2 = (data) => {
	const grid = data.split("\n").map(line => line.split(""));
	const H = grid.length, W = grid[0].length;
	const L = lcm(H - 2, W - 2);

	const start_x = 0;
	const start_y = 1;
	const end_x = H - 1;
	const end_y = W - 2;
	const D_SE = manhattan(start_x, start_y, end_x, end_y);

	/** @type {Set<string>} */
	const visited = new Set();

	const histories = new HistoricalBlizzard(grid);
	let global_best = Infinity;

	/**
	 * @param {MoveState} state
	 */
	const state_score = (state) => {
		const stage = state.stage;
		const [x, y] = state.position;

		if (stage === 0)
			return state.minutes + 2 * D_SE + manhattan(x, y, end_x, end_y);

		if (stage === 1)
			return state.minutes + D_SE + manhattan(x, y, start_x, start_y);

		return state.minutes + manhattan(x, y, end_x, end_y);
	};

	/** @type {PriorityQueue<MoveState>} */
	const pq = new PriorityQueue((a, b) => state_score(a) - state_score(b));

	pq.enqueue({
		position: [start_x, start_y],
		minutes: 0,
		stage: 0,
	});

	const directions = [0, 1, 0, -1, 0];

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	while (pq.size() > 0) {
		const state = pq.dequeue();
		if (!state) {
			throw new Error("never");
		}

		const [x, y] = state.position;
		let { minutes, stage } = state;

		const target = stage === 0
			? [end_x, end_y]
			: stage === 1
			? [start_x, start_y]
			: [end_x, end_y];

		// if reach the end
		if (x === target[0] && y === target[1]) {
			if (state.stage === 2) {
				// A*
				return state.minutes;
			} else {
				stage++;
			}
		}

		const key = [x, y, state.minutes % L, stage].join(",");
		if (visited.has(key)) {
			continue;
		}
		visited.add(key);

		const nm = state.minutes + 1;
		const { set } = histories.get_by_minutes(nm);

		// check move
		for (let i = 0; i < 4; i++) {
			const nx = x + directions[i];
			const ny = y + directions[i + 1];

			// out of grid or jump into wall
			if (!in_grid(nx, ny) || grid[nx][ny] === "#") {
				continue;
			}

			const hash = hash_position(nx, ny, W);
			// taken by blizzards
			if (set[hash]) {
				continue;
			}

			pq.enqueue({
				position: [nx, ny],
				minutes: nm,
				stage,
			});
		}
		// wait-in-place
		const hash = hash_position(x, y, W);
		if (!set[hash]) {
			pq.enqueue({
				position: [x, y],
				minutes: nm,
				stage,
			});
		}
	}

	return global_best;
};
