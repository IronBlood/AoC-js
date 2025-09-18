// Credit: https://github.com/dclamage/AOC2022/blob/main/day19/src/main.rs
// @ts-check
/**
 * @typedef {import("./types").Blueprint} Blueprint
 * @typedef {import("./types").State} State
 */

/**
 * @param {string} line
 * @returns {Blueprint}
 */
const parse_blueprint = (line) => {
	const match_id = line.match(/Blueprint (\d+)/);
	if (!match_id || match_id.length < 2) {
		throw new Error(`Cannot extract id from ${line}`);
	}
	const id = +match_id[1];

	const match_ore = line.match(/Each ore robot costs (\d+) ore\./);
	if (!match_ore || match_ore.length !== 2) {
		throw new Error(`Cannot extract ore from ${line}`);
	}
	const ore = +match_ore[1];

	const match_clay = line.match(/Each clay robot costs (\d+) ore\./);
	if (!match_clay || match_clay.length !== 2) {
		throw new Error(`Cannot extract clay from ${line}`);
	}
	const clay = +match_clay[1];

	const match_obsidian = line.match(/Each obsidian robot costs (\d+) ore and (\d+) clay\./);
	if (!match_obsidian || match_obsidian.length !== 3) {
		throw new Error(`Cannot extract obsidian from ${line}`);
	}
	const obsidian = match_obsidian.slice(1).map(Number);

	const match_geode = line.match(/Each geode robot costs (\d+) ore and (\d+) obsidian\./);
	if (!match_geode || match_geode.length !== 3) {
		throw new Error(`Cannot extract geode from ${line}`);
	}
	const geode = match_geode.slice(1).map(Number);

	const recipes = [
		[ore, 0, 0],
		[clay, 0, 0],
		[obsidian[0], obsidian[1], 0],
		[geode[0], 0, geode[1]],
	];

	const max_needed = [0, 0, 0];
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 3; j++) {
			max_needed[j] = Math.max(max_needed[j], recipes[i][j]);
		}
	}

	return {
		id,
		recipes,
		max_needed,
	};
};

/**
 * @param {State} s
 */
const collect_resource = (s, n = 1) => {
	for (let i = 0; i < 4; i++) {
		s.resources[i] += s.robots[i] * n;
	}
};

/**
 * @param {number} needed
 * @param {number} robot_have
 */
const min_minutes_needed = (needed, robot_have) => Math.ceil(needed / robot_have);

/**
 * @param {State} state
 */
const most_geodes_possible = (state) => {
	const geode_collected = state.resources[3];
	const geode_robot = state.robots[3];
	const remain = state.remain;
	return geode_collected + geode_robot * remain + (remain - 1) * remain / 2;
};

/**
 * @param {Blueprint} blueprint
 * @param {State} state
 * @returns {boolean[]}
 */
const need_more_robots = (blueprint, state) => {
	const remain = state.remain;
	const max_needed = blueprint.max_needed.map(x => x * remain);
	const theoretical_stock = state.resources.map((x, i) => x + remain * state.robots[i]);
	return theoretical_stock.slice(0, 3).map((x, idx) => x < max_needed[idx]);
};

/**
 * @param {State} state
 * @returns {State}
 */
const clone_state = (state) => ({
	remain: state.remain,
	robots: state.robots.slice(),
	resources: state.resources.slice(),
});

/**
 * @param {State} state
 * @param {Blueprint} blueprint
 * @param {number} robot_idx
 */
const build_robot_with_cost = (state, blueprint, robot_idx) => {
	const new_state = clone_state(state);
	const [
		ore_needed,
		clay_needed,
		obsidian_needed,
	] = Array.from({ length: 3 }, (_, idx) =>
		blueprint.recipes[robot_idx][idx] - new_state.resources[idx]
	);

	let max_time_needed = 0;

	if (ore_needed > 0) {
		max_time_needed = Math.max(max_time_needed,
			min_minutes_needed(ore_needed, new_state.robots[0])
		);
	}

	if (clay_needed > 0) {
		// WARN: check clay_needed in caller
		max_time_needed = Math.max(max_time_needed,
			min_minutes_needed(clay_needed, new_state.robots[1])
		);
	}

	if (obsidian_needed > 0) {
		// WARN: check obsidian_needed in caller
		max_time_needed = Math.max(max_time_needed,
			min_minutes_needed(obsidian_needed, new_state.robots[2]),
		);
	}

	max_time_needed += 1;

	if (max_time_needed > new_state.remain) {
		// fast forward
		collect_resource(new_state, new_state.remain);
		new_state.remain = 0;
	} else {
		collect_resource(new_state, max_time_needed);
		new_state.remain -= max_time_needed;

		for (let i = 0; i < 3; i++) {
			new_state.resources[i] -= blueprint.recipes[robot_idx][i];
		}
		new_state.robots[robot_idx]++;
	}

	return new_state;
};

/**
 * @param {Blueprint} blueprint
 * @param {State} state
 */
const bfs = (blueprint, state) => {
	let queue = [state];
	let max_geode = 0;

	/** @param {State} s */
	const update_max_geode = (s) => max_geode = Math.max(max_geode, s.resources[3]);

	while (queue.length > 0) {
		/** @type {typeof queue} */
		const next_queue = [];

		for (let s of queue) {
			if (s.remain === 0) {
				update_max_geode(s);
				continue;
			}

			if (s.remain === 1) {
				collect_resource(s);
				update_max_geode(s);
				continue;
			}

			if (most_geodes_possible(s) <= max_geode) {
				continue;
			}

			const [
				need_ore,
				need_clay,
				need_obsidian,
			] = need_more_robots(blueprint, s);

			if (need_ore) {
				let new_state = build_robot_with_cost(s, blueprint, 0);
				update_max_geode(new_state);
				if (new_state.remain > 0) {
					next_queue.push(new_state);
				}
			}

			if (need_clay) {
				let new_state = build_robot_with_cost(s, blueprint, 1);
				update_max_geode(new_state);
				if (new_state.remain > 0) {
					next_queue.push(new_state);
				}
			}

			if (s.resources[1] > 0 && need_obsidian) {
				let new_state = build_robot_with_cost(s, blueprint, 2);
				update_max_geode(new_state);
				if (new_state.remain > 0) {
					next_queue.push(new_state);
				}
			}

			if (s.resources[2] > 0) {
				let new_state = build_robot_with_cost(s, blueprint, 3);
				update_max_geode(new_state);
				if (new_state.remain > 0) {
					next_queue.push(new_state);
				}
			}
		}

		queue = next_queue;
	}

	return max_geode;
};

/**
 * @param {Blueprint} blueprint
 * @returns {number}
 */
const get_quality_level = (blueprint) => {
	/** @type {State} */
	const init_state = {
		remain: 24,
		robots: [1, 0, 0, 0],
		resources: [0, 0, 0, 0],
	};

	const max = bfs(blueprint, init_state);
	// console.log(max, blueprint.id);
	return max * blueprint.id;
};

/**
 * @param {string} data
 */
export const sum_quality_levels = (data) => {
	return data.split("\n").reduce((acc, line) => {
		const bp = parse_blueprint(line);
		return acc + get_quality_level(bp);
	}, 0);
};

/**
 * @param {string} data
 */
export const multiply_geodes = (data) => {
	return data.split("\n").slice(0, 3).reduce((mul, line) => {
		const bp = parse_blueprint(line);
		const max = bfs(bp, {
			remain: 32,
			robots: [1, 0, 0, 0],
			resources: [0, 0, 0, 0],
		});
		return mul * max;
	}, 1);
};
