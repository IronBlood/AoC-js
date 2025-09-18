// @ts-check

class DeterministicDice {
	constructor() {
		this.rolled = 0;
		this.idx = 0;
	}

	roll() {
		this.rolled += 3;

		const val = 3
			+ this.idx
			+ (this.idx + 1) % 100
			+ (this.idx + 2) % 100;

		this.idx = (this.idx + 3) % 100;

		return val;
	}
}

/**
 * @param {string} data
 * @returns {number}
 */
export const get_losing_point = (data) => {
	let positions = data.split("\n").map(line => Number(line.split(": ")[1]) - 1);
	let values = [0, 0];

	const die = new DeterministicDice();

	let idx = 0;

	while (values.every(x => x < 1000)) {
		const steps = die.roll();
		positions[idx] = (positions[idx] + steps) % 10;
		values[idx] += positions[idx] + 1;

		idx = 1 - idx;
	}

	return Math.min(...values) * die.rolled;
};

const steps = [
	[3, 1],
	[4, 3],
	[5, 6],
	[6, 7],
	[7, 6],
	[8, 3],
	[9, 1],
];

/**
 * @typedef {import("./types").GameState} GameState
 */

/**
 * @param {GameState} state
 */
const serialize_state = state => {
	return [
		...state.positions,
		...state.scores,
		state.current_player,
	].join(",");
};

/**
 * @param {string} key
 * @param {number} count
 * @returns {GameState}
 */
const deserialize_state = (key, count) => {
	const x = key.split(",").map(Number);
	return {
		positions: x.slice(0, 2),
		scores: x.slice(2, 4),
		current_player: x[4],
		count,
	}
};

/**
 * @param {GameState[]} states
 */
const merge = (states) => {
	/** @type {Map<string, number>} */
	const map = new Map();

	states.forEach(state => {
		const key = serialize_state(state);
		map.set(key, (map.get(key) || 0) + state.count);
	});

	states = [];
	for (const [k, v] of map) {
		states.push(deserialize_state(k, v));
	}
	return states;
};

/**
 * @param {string} data
 * @returns {number}
 */
export const get_most_winning = (data) => {
	let positions = data.split("\n").map(line => Number(line.split(": ")[1]) - 1);
	const winning = [0, 0];

	/** @type {GameState} */
	const init_state = {
		positions,
		scores: [0, 0],
		current_player: 0,
		count: 1,
	};

	let queue = [init_state];

	while (queue.length) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (const state of queue) {
			const { current_player, count } = state;

			for (const [d_step, d_count] of steps) {
				/** @type {GameState} */
				const next_state = {
					positions: state.positions.slice(),
					scores: state.scores.slice(),
					current_player: 1 - current_player,
					count,
				};

				next_state.positions[current_player] += d_step;
				next_state.positions[current_player] %= 10;
				next_state.scores[current_player] += next_state.positions[current_player] + 1;
				next_state.count *= d_count;

				if (next_state.scores[current_player] >= 21) {
					winning[current_player] += next_state.count;
					continue;
				}

				next_queue.push(next_state);
			}
		}

		queue = merge(next_queue);
	};

	return Math.max(...winning);
};
