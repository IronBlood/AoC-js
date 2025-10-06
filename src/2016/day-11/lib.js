import {
	PriorityQueue,
} from "@datastructures-js/priority-queue";

/**
 * @typedef {[number[], number[], number[], number[]]} Floors
 * @typedef {Object} SimulatorState
 * @property {Floors} floors   - each floor's items
 * @property {number} elevator - current position
 * @property {number} moves    - current steps
 * @property {string[]} prev_moves
 */

let dump_moves = false;

/**
 * deep clone
 * @param {SimulatorState} state
 * @returns {SimulatorState}
 */
const dup_state = (state) => {
	return {
		// @ts-ignore
		floors: state.floors.map(floor => floor.slice()),
		elevator: state.elevator,
		moves: state.moves,
		prev_moves: dump_moves ? state.prev_moves.slice() : [],
	};
};

/**
 * @template T
 * @param {T[][]}  result     - the array to store combinations
 * @param {T[]}    stack      - current stack
 * @param {number} idx        - current idx
 * @param {T[]}    candidates - the array to choose from
 * @param {number} k          - the maximum length of stack
 */
const backtracking_up_to_k = (result, stack, idx, candidates, k) => {
	if (stack.length > k)
		return;
	if (stack.length > 0)
		result.push([...stack]);

	for (let i = idx + 1; i < candidates.length; i++) {
		stack.push(candidates[i]);
		backtracking_up_to_k(result, stack, i, candidates, k);
		stack.pop();
	}
};

/**
 * Get id (the type) of a microchip or generator
 * @param {number} num
 */
const get_id = (num) => {
	let id = 0;
	while (num > 1) {
		num >>>= 1;
		id++;
	}
	return id;
};

/**
 * Convert a microchip or generator to another bitmap representation
 * so that a floor can be represented in a bitmap (number)
 * @param {number} num
 */
const get_bit = (num) => {
	let is_gen = 0;
	if (num < 0) {
		is_gen = 1;
		num = ~num;
	}
	const id = get_id(num);
	return (1 << (2 * id + is_gen));
};

/**
 * @param {SimulatorState} state
 * @returns {string}
 * @deprecated
 */
// @ts-ignore
const serialize_state = (state) => {
	return [
		state.elevator,
		state.floors.map(f => f.reduce((bit, curr) => bit | get_bit(curr), 0)).join(","),
	].join(";");
};

/**
 * 405s -> 0.77s (i5 6500)
 * 217.51s -> 0.47s (R7 5800x)
 *
 * There're 5 generators and 5 microchips for part 1. There're 2 more generators
 * and 2 more microchips for part 2. The maximum num of generators or chips on a
 * floor is 7, which can be represented as a 3-bit digit.
 *
 * So instead of tracking the exact state of which generators and chips have been
 * placed on a floor, we can simply track how many chips and generators are on a
 * floor, since there's no difference between A-compatible microchip and B-compatible
 * microchip. This will reduce a lot of combinations. And also, the state of one
 * floor can be encoded in a 6-bit digit.
 *
 * That makes each state can be encoded in a 26-bit digit: 24 bits for 4 floors,
 * and 2 extra bits for the elevator (0-3).
 * @param {SimulatorState} state
 * @returns {number}
 */
const serialize_state_2 = (state) => {
	let res = 0;
	for (let i = 0; i < 4; i++) {
		const floor = state.floors[i];
		let g_count = 0, m_count = 0;
		for (let x of floor) {
			if (x > 0) {
				m_count++;
			} else {
				g_count++;
			}
		}

		res |= (m_count << 3 | g_count) << (6 * i);
	}

	return (res << 2) | state.elevator;
};

/**
 * @param {SimulatorState} state
 * @returns {boolean}
 */
const is_complete = (state) => {
	for (let i = 0; i < state.floors.length - 1; i++) {
		if (state.floors[i].length != 0)
			return false;
	}
	return true;
};

/**
 * @param {number[]} floor
 */
const is_legal_floor = floor => {
	let chips = floor.filter(x => x < 0),
		gens = floor.filter(x => x > 0);

	if (chips.length === 0 || gens.length === 0)
		return true;

	for (let i = 0; i < chips.length; i++) {
		let target = ~chips[i];
		if (!gens.includes(target))
			return false;
	}

	return true;
};

/**
 * @param {SimulatorState} state
 */
const is_legal_state = (state) => {
	for (let i = 0; i < state.floors.length; i++) {
		if (!is_legal_floor(state.floors[i]))
			return false;
	}
	return true;
};

/**
 * @param {SimulatorState} state
 * @returns {SimulatorState[]}
 */
const gen_next_states = (state) => {
	/** @type {SimulatorState[]} */
	let candidates = [];

	const curr_floor = state.floors[state.elevator];

	/** @type {number[][]} */
	let possible_combos = [];
	backtracking_up_to_k(possible_combos, [], -1, curr_floor, 2);

	const dest = [state.elevator + 1, state.elevator - 1].filter(x => x >= 0 && x < state.floors.length);
	dest.forEach(d => {
		possible_combos.forEach(combo => {
			const next_state = dup_state(state);
			next_state.elevator = d;
			next_state.moves++;
			if (dump_moves)
				next_state.prev_moves.push(state.floors.map(f => f.join(",") || "_").join(";"));

			const target_floor = next_state.floors[d];
			const curr_floor   = next_state.floors[state.elevator];

			// add to the target floor and delete from current
			combo.forEach(c => {
				target_floor.push(c);
				curr_floor.splice(curr_floor.indexOf(c), 1);
			});

			next_state.floors.forEach(f => f.sort((a,b) => a - b));

			if (is_legal_state(next_state)) {
				candidates.push(next_state);
			}
		});
	});

	return candidates;
};

/**
 * @param {SimulatorState} state
 */
const score_state = (state) => {
	let res = -state.moves;
	for (let i = 0; i < state.floors.length; i++) {
		res += state.floors[i].length * i;
	}
	return res;
};

/**
 * @param {string} data
 */
export const minimum_moves = (data, part = 1, debug_enabled = false) => {
	const lines = data.split("\n");

	if (part === 2) {
		lines[0] += " elerium generator, elerium-compatible microchip, dilithium generator, dilithium-compatible microchip"
	}

	let id = 0;
	/** @type {Map<string, number>} */
	const id_map = new Map();
	const re_g = /\w+\ generator/g, re_m = /\w+-compatible\ microchip/g;

	const floors = lines.map(line => {
		/** @type {number[]} */
		const cfg = [];

		let matches = line.match(re_g);
		if (matches && matches.length > 0) {
			matches.forEach(m => {
				const name = m.split(" ")[0];
				if (!id_map.has(name)) {
					id_map.set(name, id++);
				}
				const gen_id = id_map.get(name);
				cfg.push(1 << gen_id);
			});
		}

		matches = line.match(re_m);
		if (matches && matches.length > 0) {
			matches.forEach(m => {
				const name = m.split("-")[0];
				if (!id_map.has(name)) {
					id_map.set(name, id++);
				}
				const chip_id = id_map.get(name);
				cfg.push(~(1 << chip_id));
			});
		}

		cfg.sort((a, b) => a - b);

		return cfg;
	});

	/** @type {SimulatorState} */
	let state = {
		// @ts-ignore
		floors,
		elevator: 0,
		moves: 0,
		prev_moves: [],
	};

	/** @type {Set<string | number>} */
	const visited = new Set();
	/** @type {PriorityQueue<SimulatorState>} */
	const queue = new PriorityQueue((a, b) => score_state(b) - score_state(a));
	queue.enqueue(state);

	let count = 0;
	let last_time = new Date();

	while (!queue.isEmpty()) {
		if (debug_enabled) {
			if ((count % 10000) === 0) {
				const time_now = new Date();
				console.log(`[DEBUG] ${count} - ${time_now.getTime() - last_time.getTime()}ms - ${visited.size} - ${queue.size()}`);
				last_time = time_now;
			}
			count++;
		}

		state = queue.dequeue();
		if (is_complete(state)) {
			if (dump_moves) {
				console.log(state.prev_moves);
			}
			return state.moves;
		}

		const state_key = serialize_state_2(state);
		if (visited.has(state_key)) {
			continue;
		}
		visited.add(state_key);

		gen_next_states(state).forEach(s => queue.enqueue(s));
	}

	return -1;
};
