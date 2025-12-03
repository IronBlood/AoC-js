// @ts-check

import { PriorityQueue } from "@datastructures-js/priority-queue";

const UNOCCUPIED = -1;

/**
 * @typedef {import("./types.d.ts").Cube} Cube
 * @typedef {import("./types.d.ts").Brick} Brick
 */

/**
 * @param {string} line
 * @param {number} id
 * @returns {Brick}
 */
const build_brick = (line, id) => {
	id++;
	const [low, high] = line.split("~");
	const [l_x, l_y, l_z] = low.split(",").map(Number);
	const [h_x, h_y, h_z] = high.split(",").map(Number);

	let diff = 0;
	if (l_x !== h_x)
		diff++;
	if (l_y !== h_y)
		diff++;
	if (l_z !== h_z)
		diff++;

	if (diff > 1) {
		// never
		console.log(`wierd brick: id ${id}, diff ${diff}, raw ${line}`);
	}

	/** @type {Brick} */
	const brick = {
		id,
		cubes: [],
		l_x,
		l_y,
		l_z,
		h_x,
		h_y,
		h_z,
	};

	for (let x = l_x; x <= h_x; x++) {
		for (let y = l_y; y <= h_y; y++) {
			for (let z = l_z; z <= h_z; z++) {
				brick.cubes.push({ x, y, z});
			}
		}
	}

	return brick;
};

/**
 * @param {number[][][]} grid_3d
 * @param {number[][]} tallest
 * @param {number} min_x associated with grid_3d and tallest
 * @param {number} min_y associated with grid_3d and tallest
 * @param {Brick} brick
 */
const fall = (grid_3d, tallest, min_x, min_y, brick) => {
	let tallest_z = 0;
	for (let x = brick.l_x; x <= brick.h_x; x++) {
		for (let y = brick.l_y; y <= brick.h_y; y++) {
			tallest_z = Math.max(tallest_z, tallest[x - min_x][y - min_y]);
		}
	}
	const lowest_z = tallest_z + 1;
	const diff = brick.l_z - lowest_z;

	brick.cubes.forEach(c => {
		c.z -= diff;
		grid_3d[c.x - min_x][c.y - min_y][c.z] = brick.id;
		tallest[c.x - min_x][c.y - min_y] = Math.max(
			tallest[c.x - min_x][c.y - min_y],
			c.z
		);
	});
};

/**
 * @param {number[][][]} grid_3d
 */
const dump_grid_3d_x = (grid_3d) => {
	const X = grid_3d.length;
	const Y = grid_3d[0].length;
	const Z = grid_3d[0][0].length;

	const grid = Array.from({ length: Z }, () => Array(X).fill("."));
	for (let z = 0; z < Z; z++) {
		for (let x = 0; x < X; x++) {
			for (let y = Y - 1; y >= 0; y--) {
				if (grid_3d[x][y][z] === UNOCCUPIED)
					continue;

				grid[Z - 1 - z][x] = grid_3d[x][y][z];
			}
		}
	}

	console.log(grid.map(row => row.join("")).join("\n"));
};

/**
 * @param {number[][][]} grid_3d
 */
const dump_grid_3d_y = (grid_3d) => {
	const X = grid_3d.length;
	const Y = grid_3d[0].length;
	const Z = grid_3d[0][0].length;

	const grid = Array.from({ length: Z }, () => Array(X).fill("."));
	for (let z = 0; z < Z; z++) {
		for (let y = 0; y < Y; y++) {
			for (let x = X - 1; x >= 0; x--) {
				if (grid_3d[x][y][z] === UNOCCUPIED)
					continue;

				grid[Z - 1 - z][y] = grid_3d[x][y][z];
			}
		}
	}

	console.log(grid.map(row => row.join("")).join("\n"));
};

/**
 * @param {number[][][]} grid_3d
 * @param {number} min_x
 * @param {number} min_y
 * @param {Brick} brick
 */
const get_upper_bricks = (grid_3d, min_x, min_y, brick) => {
	/** @type {Set<number>} */
	const upper_ids = new Set();

	// find supported and set to UNOCCUPIED
	brick.cubes.forEach(c => {
		const x = c.x - min_x;
		const y = c.y - min_y;
		const z = c.z + 1;
		const id = grid_3d[x][y][z];
		if (id !== UNOCCUPIED && id !== brick.id) {
			upper_ids.add(id);
		}
	});

	return upper_ids;
};

/**
 * @param {number[][][]} grid_3d
 * @param {number} min_x
 * @param {number} min_y
 * @param {Brick} brick
 */
const is_brick_supported_without = (grid_3d, min_x, min_y, brick, original_id) => {
	let supported = false;
	for (const c of brick.cubes) {
		const x = c.x - min_x;
		const y = c.y - min_y;
		const z = c.z - 1;

		const below_id = grid_3d[x][y][z];

		if (below_id !== UNOCCUPIED && below_id !== original_id && below_id !== brick.id) {
			supported = true;
			break;
		}
	}
	return supported;
};

/**
 * @param {number[][][]} grid_3d
 * @param {number} min_x
 * @param {number} min_y
 * @param {Brick} brick
 * @param {Brick[]} bricks
 */
const is_brick_removable = (grid_3d, min_x, min_y, brick, bricks) => {
	const upper_ids = get_upper_bricks(grid_3d, min_x, min_y, brick);

	let removable = true;
	for (const id of upper_ids) {
		const upper_brick = bricks.find(x => x.id === id);
		if (!upper_brick) {
			throw new Error("never");
		}
		if (!is_brick_supported_without(grid_3d, min_x, min_y, upper_brick, brick.id)) {
			removable = false;
			break;
		}
	}

	return removable;
};

/**
 * @param {number[][][]} grid_3d
 * @param {number} min_x
 * @param {number} min_y
 * @param {Brick} brick
 * @param {Brick[]} bricks
 */
const remove = (grid_3d, min_x, min_y, brick, bricks) => {
	const dup = grid_3d.map(x => x.map(y => y.slice()))

	let count = 0;
	let queue = [brick];

	/**
	 * @param {Brick} b
	 */
	const do_remove = (b) => {
		b.cubes.forEach(c => {
			const x = c.x - min_x;
			const y = c.y - min_y;
			dup[x][y][c.z] = UNOCCUPIED;
		});
	};

	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const b of queue) {
			count++;

			const upper_ids = get_upper_bricks(dup, min_x, min_y, b);

			do_remove(b);

			for (const upper_id of upper_ids) {
				const upper_brick = bricks.find(x => x.id === upper_id);
				if (!upper_brick) {
					throw new Error("never");
				}
				if (!is_brick_supported_without(dup, min_x, min_y, upper_brick, b.id)) {
					next_queue.push(upper_brick);
				}
			}
		}
		queue = next_queue;
	}

	return count;
};

/**
 * @param {string} data
 * @returns {number[]}
 */
export const solve_22 = (data) => {
	const bricks = data.split("\n").map(build_brick);

	/** @type {PriorityQueue<Brick>} */
	const pq = new PriorityQueue(
		(a, b) => a.l_z !== b.l_z
			? a.l_z - b.l_z
			: a.l_x !== b.l_x
			? a.l_x - b.l_x
			: a.l_y - b.l_y
	);

	let max_x = Number.MIN_SAFE_INTEGER, max_y = Number.MIN_SAFE_INTEGER;
	let min_x = Number.MAX_SAFE_INTEGER, min_y = Number.MAX_SAFE_INTEGER;
	let max_z = 0;

	bricks.forEach(b => pq.enqueue(b));

	bricks.forEach(b => {
		max_x = Math.max(max_x, b.h_x);
		max_y = Math.max(max_y, b.h_y);
		min_x = Math.min(min_x, b.l_x);
		min_y = Math.min(min_y, b.l_y);
		max_z = Math.max(max_z, b.h_z);
	});

	const W_X = max_x - min_x + 1, W_Y = max_y - min_y + 1;
	/** @type {number[][][]} */
	const grid_3d = Array.from({ length: W_X }, () =>
		Array.from({ length: W_Y }, () => Array(max_z + 1).fill(UNOCCUPIED))
	);
	/** @type {number[][]} */
	const tallest = Array.from({ length: W_X }, () => Array(W_Y).fill(0));
	for (let i = 0; i < W_X; i++) {
		for (let j = 0; j < W_Y; j++) {
			grid_3d[i + min_x][j + min_y][0] = 0; // ground
		}
	}

	while (!pq.isEmpty()) {
		const brick = pq.dequeue();
		if (!brick) {
			throw new Error("never");
		}
		fall(grid_3d, tallest, min_x, min_y, brick);
	}

	// dump_grid_3d_x(grid_3d);
	// dump_grid_3d_y(grid_3d);

	let part1_sum = 0;
	/** @type {Brick[]} */
	let part2_bricks = [];

	bricks.forEach(b => {
		if (is_brick_removable(grid_3d, min_x, min_y, b, bricks)) {
			part1_sum++;
		} else {
			part2_bricks.push(b);
		}
	});

	let part2_sum = 0;

	part2_bricks.forEach(b => {
		// NOTE: to remove the brick `b` itself
		const count = remove(grid_3d, min_x, min_y, b, bricks) - 1;
		part2_sum += count;
	});

	return [part1_sum, part2_sum];
};
