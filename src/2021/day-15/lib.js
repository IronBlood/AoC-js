// @ts-check

import {
	PriorityQueue,
} from "@datastructures-js/priority-queue";

/**
 * @param {number} x
 * @param {number} y
 */
const get_neighbors = (x, y) => {
	return [
		[x - 1, y],
		[x + 1, y],
		[x, y - 1],
		[x, y + 1],
	];
};

/**
 * @param {number[][]} grid
 * @returns {number[][]}
 */
const enlarge = (grid) => {
	const H = grid.length, W = grid[0].length;

	/** @type {number[][]} */
	const next_grid = Array.from({ length: H * 5 }, () => Array(W * 5));

	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			const step = i + j;
			for (let u = 0; u < H; u++) {
				for (let v = 0; v < W; v++) {
					const x = i * H + u;
					const y = j * W + v;

					const risk = grid[u][v] + step;
					next_grid[x][y] = (risk <= 9) ? risk : (risk - 9);
				}
			}
		}
	}

	return next_grid;
};

/**
 * @typedef {{ position: [number, number]; sum: number}} State
 * @param {string} data
 */
export const lowest_total_risk = (data, part = 1) => {
	const USE_PQ = true;

	const base_grid = data.split("\n").map(line => line.split("").map(Number));

	const grid = part === 1 ? base_grid : enlarge(base_grid);

	const H = grid.length, W = grid[0].length;

	/** @type {number[][]} */
	const risks = Array.from({ length: H }, () => Array(W).fill(Number.MAX_SAFE_INTEGER));

	const in_grid = (x, y) => x >= 0 && y >= 0 && x < H && y < W;
	// let iter_count = 0;

	if (USE_PQ) {
		// priority queue: < 1s, ~1m iterations for part 2
		/**
		 * @param {number} x
		 * @param {number} y
		 */
		const get_distance = (x, y) => (H - 1 - x) + (W - 1 - y);

		/**
		 * @param {State} state
		 */
		const score_state = (state) => {
			return get_distance(state.position[0], state.position[1]) + state.sum;
		};

		/** @type {PriorityQueue<State>} MinHeap */
		const pq = new PriorityQueue(
			(a, b) => score_state(a) - score_state(b)
		);
		pq.enqueue({ position: [0, 0], sum: 0 });

		while (!pq.isEmpty()) {
			// iter_count++;
			const curr = pq.dequeue();
			if (!curr) {
				throw new Error("never");
			}

			const [x, y] = curr.position;
			const sum = grid[x][y] + curr.sum;

			if (sum >= risks[x][y])
				continue;
			risks[x][y] = sum;

			const min_remain = get_distance(x, y);
			if (sum + min_remain > risks[H - 1][W - 1])
				continue;

			get_neighbors(x, y).forEach(([nx, ny]) => {
				if (in_grid(nx, ny)) {
					pq.enqueue({
						position: [nx, ny],
						sum,
					});
				}
			});
		}
	} else {
		// simple queue: ~130s, 300m iterations for part 2
		let queue = [[0, 0, 0]];
		while (queue.length > 0) {
			/** @type {typeof queue} */
			const next_queue = [];

			for (let [x, y, sum] of queue) {
				// iter_count++;
				if (!in_grid(x, y))
					continue;
				sum += grid[x][y];
				if (sum >= risks[x][y])
					continue;
				risks[x][y] = sum;

				const neighbors = get_neighbors(x, y)
				.filter(([nx, ny]) => in_grid(nx, ny))
				.map(([nx, ny]) => [nx, ny, grid[nx][ny]])
				.sort((a, b) => a[2] - b[2]);

				for (const [nx, ny] of neighbors) {
					next_queue.push([nx, ny, sum]);
				}
			}

			queue = next_queue;
		}
	}

	// console.log(`[DEBUG] iter count: ${iter_count}`);
	return risks[H - 1][W - 1] - grid[0][0];
}
