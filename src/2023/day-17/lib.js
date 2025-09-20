// @ts-check

import { PriorityQueue } from "@datastructures-js/priority-queue";

/**
 * @typedef {Object} State
 * @property {number} x
 * @property {number} y
 * @property {number} loss
 * @property {number} dir_idx
 * @property {number} step_count
 */

/**
 * @param {State} state
 */
const hash_state = (state) => {
	const {
		x,
		y,          // 8bit
		dir_idx,    // 2bit
		step_count, // 4bit
	} = state;

	return (x << (8 + 2 + 4)) | (y << (2 + 4)) | (dir_idx << 4) | step_count;
};

const Vectors = [
	[-1, 0], // N
	[0, 1],  // E
	[1, 0],  // S
	[0, -1], // W
];

/**
 * @param {string} data
 */
export const least_heat_loss = (data, min_step = 1, max_step = 3) => {
	const grid = data.split("\n").map(line => line.split("").map(Number));
	const H = grid.length, W = grid[0].length;
	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;

	/** @type {Map<number, number>} */
	const visited = new Map();

	/** @type {PriorityQueue<State>} */
	const pq = new PriorityQueue(
		(a, b) => a.loss - b.loss
	);

	for (const dir_idx of [1, 2]) {
		/** @type {State} */
		const init = { x: 0, y: 0, loss: 0, dir_idx, step_count: 0 };
		const k = hash_state(init);
		visited.set(k, 0);
		pq.enqueue(init);
	}

	while (!pq.isEmpty()) {
		/** @type {State} */
		// @ts-ignore
		const state = pq.dequeue();
		const key = hash_state(state);
		const { x, y, loss, dir_idx, step_count } = state;

		// @ts-ignore
		if (visited.has(key) && state.loss > visited.get(key))
			continue;

		if (x === H - 1 && y === W - 1) {
			if (step_count >= min_step) {
				return loss;
			} else {
				continue;
			}
		}

		if (step_count < max_step) {
			const [dx, dy] = Vectors[dir_idx];
			const nx = x + dx, ny = y + dy;

			if (in_grid(nx, ny)) {
				const next = {
					x: nx,
					y: ny,
					loss: loss + grid[nx][ny],
					dir_idx,
					step_count: step_count + 1,
				};

				const next_key = hash_state(next);
				const prev = visited.get(next_key);
				if (prev === undefined || next.loss < prev) {
					visited.set(next_key, next.loss);
					pq.enqueue(next);
				}
			}
		}

		if (step_count >= min_step) {
			for (const nd of [ (dir_idx + 3) % 4, (dir_idx + 1) % 4 ]) {
				const [dx, dy] = Vectors[nd];
				const nx = x + dx, ny = y + dy;
				if (in_grid(nx, ny)) {
					const next = {
						x: nx,
						y: ny,
						loss: loss + grid[nx][ny],
						dir_idx: nd,
						step_count: 1,
					};
					const next_key = hash_state(next);
					const prev = visited.get(next_key);
					if (prev === undefined || next.loss < prev) {
						visited.set(next_key, next.loss);
						pq.enqueue(next);
					}
				}
			}
		}
	}

	return -1;
};
