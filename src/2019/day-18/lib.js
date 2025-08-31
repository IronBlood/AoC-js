// credit https://github.com/prscoelho/aoc2019/blob/master/src/aoc18/mod.rs
// More explanation: https://www.reddit.com/r/adventofcode/comments/ec8090/2019_day_18_solutions/fhiwgh4/

// @ts-check

import { PriorityQueue } from "@datastructures-js/priority-queue";

/**
 * @typedef {import("./types").GraphEntry} GraphEntry
 * @typedef {import("./types").Graph} Graph
 * @typedef {import("./types").State} State
 * @typedef {import("./types").FourState} FourState
 */

const CHAR_R0 = "@";
const CHAR_R1 = "$";
const CHAR_R2 = "%";
const CHAR_R3 = "^";

/**
 * Check whether `x` is a key (a lowercase letter)
 * @param {string} x
 */
const is_key = (x) => /[a-z]/.test(x);

/**
 * Check whether `x` is a door (an uppercase letter)
 * @param {string} x
 */
const is_door = (x) => /[A-Z]/.test(x);

/**
 * Check whether the key `x` is collected
 * @param {number} num A bitmap for keys
 * @param {string} x
 */
const contains_key = (num, x) => num & numfy_key(x);

/**
 * Check whether there's a key for the door `x`
 * @param {number} num keys
 * @param {string} x door
 */
const has_key_for_door = (num, x) => num & key_for_door(x);

/**
 * A function to map A-Z to 0-25, and A-Z to 26-51, and R0-4 to 52-55,
 * so that a char can be represented with 6 bits (0 - 63), which will
 * later be used for hashing
 * @param {string} char
 * @returns a number from 0 to 55 (inclusively)
 */
const char_to_num = (char) => {
	if (/[a-z]/.test(char)) {
		return char.charCodeAt(0) - 97;
	}
	if (/[A-Z]/.test(char)) {
		return char.charCodeAt(0) - 65 + 26;
	}

	// robots
	switch (char) {
		case CHAR_R0: return 52;
		case CHAR_R1: return 53;
		case CHAR_R2: return 54;
		case CHAR_R3: return 55;
	}

	throw new Error("never");
};

/**
 * Convert a key to a bit flag
 * @param {string} x
 */
const numfy_key = x => 1 << (x.charCodeAt(0) - 97);

/**
 * Get the bit flag for a door
 * @param {string} x
 */
const key_for_door = x => 1 << (x.charCodeAt(0) - 65);

/**
 * @param {string[]} arr an array of 1-len strings
 */
const char_arr_to_num = (arr) => arr.reduce((s, char) => (s << 6) | char_to_num(char), 0);

/**
 * @param {number} x
 * @param {number} y
 */
const stringify_position = (x, y) => `${x},${y}`;

/**
 * Serialize state to a number, based on the current node and the keys
 * @param {State} state
 */
const serialize_state = (state) => hash(char_to_num(state.char), state.keys);

/**
 * Serialize state to a number, based on the current nodes and the keys
 * @param {FourState} state
 */
const serialize_four_state = (state) => hash(char_arr_to_num(state.chars), state.keys);

/**
 * Get the key based on the current node and keys
 * @param {string} char
 * @param {number} keys
 */
const get_cache_key = (char, keys) => hash(char_to_num(char), keys);

/**
 * @param {number} x
 * @param {number} keys
 */
const hash = (x, keys) => BigInt(x) << 26n | BigInt(keys);

const CHAR_WALL = "#";
const CHAR_OPEN = ".";

const DIRS = [0, 1, 0, -1, 0];

/**
 * Using a BFS approach to compress the graph
 * @param {string[][]} grid
 * @param {number} x
 * @param {number} y
 */
const build_entry = (grid, x, y) => {
	/** @type {GraphEntry} */
	const entry = {
		position: [x, y],
		neighbors: Object.create(null),
	};

	let queue = [[x, y]];
	let steps = 0;
	const visited = new Set([stringify_position(x, y)]);

	while (queue.length) {
		let next_queue = [];
		steps++;

		for (const [x, y] of queue) {
			for (let i = 0; i < 4; i++) {
				const nx = x + DIRS[i];
				const ny = y + DIRS[i + 1];
				const key = stringify_position(nx, ny);
				if (visited.has(key))
					continue;
				visited.add(key);

				const char = grid[nx][ny];
				if (char === CHAR_WALL) {
					continue;
				}

				if (char === CHAR_OPEN) {
					next_queue.push([nx, ny]);
					continue;
				}

				entry.neighbors[char] = steps;
			}
		}

		queue = next_queue;
	}

	return entry;
};

/**
 * @param {string[][]} grid
 */
export const build_graph = (grid) => {
	/** @type {Graph} */
	const graph = Object.create(null);

	const H = grid.length, W = grid[0].length;
	for (let i = 0; i < H; i++) {
		for (let j = 0; j < W; j++) {
			const char = grid[i][j];
			// skip open tile or wall
			if (char === CHAR_OPEN || char === CHAR_WALL) {
				continue;
			}

			graph[char] = build_entry(grid, i, j);
		}
	}

	return graph;
};

/**
 * Using bitmap to get all targets
 * @param {Graph} graph
 */
const get_all_keys = (graph) => {
	let keys = 0;
	for (const key of Object.keys(graph)) {
		if (/[a-z]/.test(key)) {
			keys |= numfy_key(key);
		}
	}
	return keys;
};

/**
 * Get all reachable keys, based on the keys we have collected
 * @param {Graph} graph
 * @param {number} keys
 * @param {string} char
 * @returns {Map<string, number>} All reachable nodes of keys and costs
 */
const search_keys = (graph, keys, char) => {
	/** @type {Map<string, number>} */
	const distances = new Map();
	for (const node of Object.keys(graph)) {
		distances.set(node, Infinity);
	}

	/** @type {Set<string>} */
	const reachable_set = new Set();

	let queue = [{ char, cost: 0 }];

	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const { char, cost } of queue) {
			if (cost > (distances.get(char) || Infinity)) {
				continue;
			}

			// if current node is a key, then no further actions
			if (is_key(char) && !contains_key(keys, char)) {
				reachable_set.add(char);
				continue;
			}

			const neighbors = graph[char].neighbors;
			for (const [next_node, edge_cost] of Object.entries(neighbors)) {
				if (is_door(next_node) && !has_key_for_door(keys, next_node)) {
					// There's no key for this door, so ignore
					continue;
				}
				const next_cost = cost + edge_cost;
				const prev = distances.get(next_node) || Infinity;
				if (next_cost < prev) {
					distances.set(next_node, next_cost);
					next_queue.push({ char: next_node, cost: next_cost });
				}
			}
		}

		queue = next_queue;
	}

	/** @type {Map<string, number>} */
	const res = new Map();
	for (const key of reachable_set) {
		res.set(key, distances.get(key) || Infinity);
	}
	return res;
};

/**
 * @param {Graph} graph
 */
const search = (graph) => {
	const target_keys = get_all_keys(graph);

	/** @type {PriorityQueue<State>} */
	const pq = new PriorityQueue((a, b) => a.steps - b.steps);
	/**
	 * record the minimum steps to reach a state
	 * @type {Map<bigint, number>}
	 */
	const memo_best = new Map();
	/** @type {State} */
	const init_state = {
		steps: 0,
		char: "@",
		keys: 0,
	}
	memo_best.set(serialize_state(init_state), init_state.steps);
	pq.enqueue(init_state);

	/**
	 * The cost base on current node and keys which have been gathered
	 * @type {Map<bigint, Map<string, number>>}
	 */
	const cache_cost = new Map();

	while (!pq.isEmpty()) {
		const curr_state = pq.dequeue();
		if (!curr_state) {
			throw new Error("never");
		}

		if (curr_state.keys === target_keys) {
			// Since pq is a MinHeap
			return curr_state.steps;
		}

		const state_key = serialize_state(curr_state);
		const best = memo_best.get(state_key) || Infinity;
		if (curr_state.steps > best) {
			continue;
		}

		const reachable_key = get_cache_key(curr_state.char, curr_state.keys);
		let reachable_key_nodes = cache_cost.get(reachable_key);
		if (reachable_key_nodes === undefined) {
			reachable_key_nodes = search_keys(graph, curr_state.keys, curr_state.char);
			cache_cost.set(reachable_key, reachable_key_nodes);
		}

		for (const [next_node, cost] of reachable_key_nodes) {
			const next_keys = curr_state.keys | numfy_key(next_node);
			const next_steps = curr_state.steps + cost;

			/** @type {State} */
			const next_state = {
				steps: next_steps,
				keys: next_keys,
				char: next_node,
			};
			const next_state_key = serialize_state(next_state);
			const next_best = memo_best.get(next_state_key) || Infinity;
			if (next_steps < next_best) {
				memo_best.set(next_state_key, next_steps);
				pq.enqueue(next_state);
			}
		}
	}

	return Infinity;
};

/**
 * @param {Graph} graph
 */
const search_four = (graph) => {
	const target_keys = get_all_keys(graph);

	/** @type {PriorityQueue<FourState>} */
	const pq = new PriorityQueue((a, b) => a.steps - b.steps);

	/**
	 * record the minimum steps to reach a state
	 * @type {Map<bigint, number>}
	 */
	const memo_best = new Map();
	/** @type {FourState} */
	const init_state = {
		steps: 0,
		chars: [
			CHAR_R0,
			CHAR_R1,
			CHAR_R2,
			CHAR_R3,
		],
		keys: 0,
	};
	memo_best.set(serialize_four_state(init_state), init_state.steps);
	pq.enqueue(init_state);

	/**
	 * The cost base on current node and keys which have been gathered
	 * @type {Map<bigint, Map<string, number>>}
	 */
	const cache_cost = new Map();

	while (!pq.isEmpty()) {
		const curr_state = pq.dequeue();
		if (!curr_state) {
			throw new Error("never");
		}

		if (curr_state.keys === target_keys) {
			// Since pq is a MinHeap
			return curr_state.steps;
		}

		const state_key = serialize_four_state(curr_state);
		const best = memo_best.get(state_key) || Infinity;
		if (curr_state.steps > best) {
			continue;
		}

		for (let robot_idx = 0; robot_idx < curr_state.chars.length; robot_idx++) {
			const char = curr_state.chars[robot_idx];
			const reachable_key = get_cache_key(char, curr_state.keys);
			let reachable_key_nodes = cache_cost.get(reachable_key);
			if (!reachable_key_nodes) {
				reachable_key_nodes = search_keys(graph, curr_state.keys, char);
				cache_cost.set(reachable_key, reachable_key_nodes);
			}

			for (const [next_node, cost] of reachable_key_nodes) {
				const next_keys = curr_state.keys | numfy_key(next_node);

				const next_chars = curr_state.chars.slice();
				next_chars[robot_idx] = next_node;

				const next_steps = curr_state.steps + cost;

				/** @type {FourState} */
				const next_state = {
					steps: next_steps,
					chars: next_chars,
					keys: next_keys,
				};
				const next_state_key = serialize_four_state(next_state);
				const prev = memo_best.get(next_state_key) || Infinity;

				if (next_steps < prev) {
					memo_best.set(next_state_key, next_steps);
					pq.enqueue(next_state);
				}
			}
		}
	}

	return Infinity;
};

/**
 * @param {string[][]} grid
 */
const patch = (grid) => {
	let initialized = false;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === "@") {
				initialized = true;

				grid[i][j] = CHAR_WALL;
				for (let k = 0; k < 4; k++) {
					const ni = i + DIRS[k];
					const nj = j + DIRS[k + 1];
					grid[ni][nj] = CHAR_WALL;
				}

				grid[i - 1][j - 1] = CHAR_R0;
				grid[i - 1][j + 1] = CHAR_R1;
				grid[i + 1][j - 1] = CHAR_R2;
				grid[i + 1][j + 1] = CHAR_R3;
				break;
			}
		}
		if (initialized)
			break;
	}
	if (!initialized) {
		throw new Error("never");
	}
};

/**
 * @param {string} data
 */
export const count_steps = (data, part = 1) => {
	const grid = data.split("\n").map(line => line.split(""));
	if (part === 2) {
		patch(grid);
	}

	const graph = build_graph(grid);

	return part === 1 ? search(graph) : search_four(graph);
};
