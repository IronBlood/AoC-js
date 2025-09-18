// Credit https://github.com/Mesoptier/advent-of-code-2021/blob/master/src/days/day23.rs
// @ts-check

import {
	PriorityQueue,
} from "@datastructures-js/priority-queue";

/**
 * @typedef {import("./types").State} State
 * @typedef {import("./types").PQEntry} PQEntry
 */

/**
 * Encode a state to a number, which:
 *   - null -> 0
 *   - 0 -> 1
 *   - 1 -> 2
 *   - 2 -> 3
 *   - 3 -> 4
 * so that each state can be hashed efficiently
 * @param {State} state
 * @returns {bigint} encoded state
 * @see {@link decode_state}
 */
const encode_state = (state) => {
	return [
		...state.rooms.flat().reverse(),
		...state.hallway.slice().reverse(),
	].reduce((sum, curr) => sum * 5n + (curr === null ? 0n : BigInt(curr + 1)), 0n);
};

/**
 * Decode to a state
 * @param {bigint} n
 * @param {2|4} room_per_slot
 * @returns {State}
 * @see {@link encode_state}
 */
const decode_state = (n, room_per_slot = 2) => {
	const pop = () => {
		const remain = Number(n % 5n);
		n /= 5n;
		return (remain === 0) ? null : (remain - 1);
	};

	/** @type {(number|null)[]} */
	const hallway = Array(11).fill(null);
	for (let i = 0; i < 11; i++) {
		hallway[i] = pop();
	}

	/** @type {(number|null)[][]} */
	const rooms = Array.from({ length: 4 }, () => Array(room_per_slot).fill(null));
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < room_per_slot; j++) {
			rooms[i][j] = pop();
		}
	}

	return { hallway, rooms };
};

/**
 * Duplicate a state
 * @param {State} state
 * @returns {State}
 */
const dup_state = (state) => {
	return {
		hallway: state.hallway.slice(),
		rooms: state.rooms.map(r => r.slice()),
	}
};

/**
 * @returns {State}
 */
const get_goal = (rooms_per_slot = 2) => {
	return {
		hallway: Array(11).fill(null),
		rooms: [0, 1, 2, 3].map(x => /** @type {number[]} */Array(rooms_per_slot).fill(x)),
	}
};

/**
 * @param {number} amphipod represented by 0(A), 1(B), 2(C) and 3(D).
 */
const amphipod_energy = (amphipod) => Math.pow(10, amphipod);

/**
 * @param {State} state
 * @param {number} room_index
 * @returns {boolean}
 */
const is_room_enterable = (state, room_index) => {
	for (const x of state.rooms[room_index]) {
		if (x === null)
			continue;

		if (x !== room_index)
			return false;
	}

	return true;
};

/**
 * @param {State} state
 * @param {number} room_index
 * @returns {boolean}
 */
const is_room_exitable = (state, room_index) => {
	for (const x of state.rooms[room_index]) {
		if (x === null || x === room_index)
			continue;
		return true;
	}
	return false;
};

/**
 * @param {number} room_idx
 */
const room_idx_to_hallway_idx = (room_idx) => 2 + room_idx * 2;

/**
 * Hardcoded indices
 * @param {number} hallway_idx
 */
const is_hallway_idx_above_room = (hallway_idx) => [2, 4, 6, 8].includes(hallway_idx);

/**
 * @param {State} state
 * @param {number} start
 * @param {number} end
 */
const is_hallway_clear = (state, start, end) => {
	if (start === end)
		return true;

	if (start < end) {
		for (let i = start + 1; i <= end; i++) {
			if (state.hallway[i] !== null)
				return false;
		}
	} else {
		for (let i = end; i < start; i++) {
			if (state.hallway[i] !== null)
				return false;
		}
	}

	return true;
};

/**
 * @param {State} state
 * @param {number} hallway_idx
 */
const empty_spaces = (state, hallway_idx) => {
	const result = [];

	for (let i = hallway_idx - 1; i >= 0; i--) {
		if (state.hallway[i] !== null)
			break;
		result.push(i);
	}

	for (let i = hallway_idx + 1; i < 11; i++) {
		if (state.hallway[i] !== null)
			break;
		result.push(i);
	}

	return result;
};

/**
 * @param {State} state
 */
const room_to_hallway_transitions = (state) => {
	/** @type {[State, number][]} */
	const result = [];

	for (let room_idx = 0; room_idx < 4; room_idx++) {
		if (!is_room_exitable(state, room_idx))
			continue;

		const room = state.rooms[room_idx];

		let room_depth = null;
		let amphipod = null;

		for (let d = 0; d < room.length; d++) {
			if (room[d] !== null) {
				room_depth = d;
				amphipod = room[d];
				break;
			}
		}

		if (amphipod === null || room_depth === null)
			throw new Error("never");

		const hallway_idx = room_idx_to_hallway_idx(room_idx);

		for (const es of empty_spaces(state, hallway_idx)) {
			if (is_hallway_idx_above_room(es))
				continue;

			const steps = room_depth + 1 + Math.abs(hallway_idx - es);
			const energy = steps * amphipod_energy(amphipod);
			const new_state = dup_state(state);
			new_state.hallway[es] = amphipod;
			new_state.rooms[room_idx][room_depth] = null;

			result.push([new_state, energy]);
		}
	}

	return result;
};

/**
 * @param {State} state
 */
const hallway_to_room_transitions = (state) => {
	/** @type {[State, number][]} */
	const result = [];

	for (let hallway_idx = 0; hallway_idx < 11; hallway_idx++) {
		const amphipod = state.hallway[hallway_idx];
		if (amphipod === null)
			continue;

		const target_room_idx = amphipod;
		if (!is_room_enterable(state, target_room_idx))
			continue;

		const room_hallway_idx = room_idx_to_hallway_idx(target_room_idx);
		if (!is_hallway_clear(state, hallway_idx, room_hallway_idx))
			continue;

		const room = state.rooms[target_room_idx];
		let target_room_depth = -1;
		for (let d = room.length - 1; d >= 0; d--) {
			if (room[d] === null) {
				target_room_depth = d;
				break;
			}
		}
		// defensive
		if (target_room_depth === -1)
			continue;

		const steps = target_room_depth + 1 + Math.abs(hallway_idx - room_hallway_idx);
		const energy = steps * amphipod_energy(amphipod);
		const new_state = dup_state(state);
		new_state.rooms[target_room_idx][target_room_depth] = amphipod;
		new_state.hallway[hallway_idx] = null;

		result.push([new_state, energy]);
	}

	return result;
};

/**
 * @param {State} state
 * @returns {number}
 */
const h_score = (state) => {
	let exit_room = 0;
	for (let room_idx = 0; room_idx < 4; room_idx++) {
		const room = state.rooms[room_idx];
		const hallway_idx = room_idx_to_hallway_idx(room_idx);

		let seen_wrong = false;
		for (let d = room.length - 1; d >= 0; d--) {
			const amphipod = room[d];
			if (amphipod === null)
				continue;

			if (!seen_wrong && amphipod === room_idx)
				continue;

			seen_wrong = true;
			const target_hallway_idx = room_idx_to_hallway_idx(amphipod);
			const hallway_steps = Math.max(Math.abs(target_hallway_idx - hallway_idx), 2);
			const min_steps = (d + 1) + hallway_steps;
			exit_room += min_steps * amphipod_energy(amphipod);
		}
	}

	let move_hallway = 0;
	for (let hallway_idx = 0; hallway_idx < 11; hallway_idx++) {
		const amphipod = state.hallway[hallway_idx];
		if (amphipod === null)
			continue;
		const target_hallway_idx = room_idx_to_hallway_idx(amphipod);
		move_hallway += amphipod_energy(amphipod) * Math.abs(target_hallway_idx - hallway_idx);
	}

	let enter_room = 0;
	for (let room_idx = 0; room_idx < 4; room_idx++) {
		const room = state.rooms[room_idx];

		let start = -1;
		for (let d = room.length - 1; d >= 0; d--) {
			const amphipod = room[d];
			if (amphipod !== null && amphipod === room_idx)
				continue;
			start = d;
			break;
		}

		if (start === -1)
			continue;

		for (let d = start; d >= 0; d--) {
			enter_room += (d + 1) * amphipod_energy(room_idx);
		}
	}

	const energy_required = exit_room + move_hallway + enter_room;
	return energy_required;
};

/**
 * Get the letters (ABCD) with hardcoded row and col numbers
 * @param {string} input
 */
const get_amphipods = (input) => {
	const lines = input.split("\n");

	/** @type {number[]} */
	const amphipods = [];
	[2, 3].forEach(row => {
		[3, 5, 7, 9].forEach(col => {
			amphipods.push(lines[row].charCodeAt(col) - 65);
		});
	});

	return amphipods;
};

/**
 * A* search
 * @param {State} state
 * @returns {number}
 */
const solve = (state) => {
	/** @ts-ignore @type {2|4} */
	const room_per_slot = state.rooms[0].length;
	if (room_per_slot !== 2 && room_per_slot !== 4) {
		throw new Error("never");
	}

	/** @type {PriorityQueue<PQEntry>} */
	const pq = new PriorityQueue((a, b) => {
		const score_a = a.g + a.h;
		const score_b = b.g + b.h;
		return score_a - score_b;
	});

	const encoded_initial_state = encode_state(state);

	pq.enqueue({
		encoded_state: encoded_initial_state,
		g: 0,
		h: h_score(state),
	});

	/** @type {Map<bigint, number>} */
	const g_scores = new Map([[encoded_initial_state, 0]]);

	const encoded_goal_state = encode_state(get_goal(room_per_slot));
	while (!pq.isEmpty()) {
		const entry = pq.dequeue();
		if (entry === null) {
			throw new Error("never");
		}

		const { encoded_state, g: f_score } = entry;
		if (encoded_state === encoded_goal_state) {
			return f_score;
		}

		if ((g_scores.get(encoded_state) ?? Infinity) < f_score) {
			continue;
		}

		const state = decode_state(encoded_state, room_per_slot);
		// loop through all possible transitions
		for (const [next_state, transition_cost] of [
			...room_to_hallway_transitions(state),
			...hallway_to_room_transitions(state),
		]) {
			const next_score = f_score + transition_cost;
			const next_encoded = encode_state(next_state);
			if (next_score < (g_scores.get(next_encoded) ?? Infinity)) {
				g_scores.set(next_encoded, next_score);
				pq.enqueue({
					encoded_state: next_encoded,
					g: next_score,
					h: h_score(next_state),
				});
			}
		}
	}

	throw new Error("never");
};

/**
 * @param {string} data
 * @returns {number}
 */
export const least_energy = (data, part = 1) => {
	const amphipods = get_amphipods(data);
	if (amphipods.length !== 8 || !amphipods.every(x => x >= 0 && x < 4)) {
		throw new Error("never");
	}

	const hallway = Array(11).fill(null);
	const rooms = part === 1
		? [
			[
				amphipods[0],
				amphipods[4],
			],
			[
				amphipods[1],
				amphipods[5],
			],
			[
				amphipods[2],
				amphipods[6],
			],
			[
				amphipods[3],
				amphipods[7],
			],
		]
		: [
			[
				amphipods[0],
				3, 3,
				amphipods[4],
			],
			[
				amphipods[1],
				2, 1,
				amphipods[5],
			],
			[
				amphipods[2],
				1, 0,
				amphipods[6],
			],
			[
				amphipods[3],
				0, 2,
				amphipods[7],
			],
		];

	/** @type {State} */
	const initial_state = {
		hallway,
		rooms,
	};

	return solve(initial_state);
}
