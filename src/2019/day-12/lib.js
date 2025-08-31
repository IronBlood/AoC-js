import { lcm } from "../../lib/math.js";

/**
 * @typedef {Object} PV for position and velocity
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @typedef {Object} Moon
 * @property {PV} location
 * @property {PV} velocity
 */

/**
 * @param {string} data
 * @returns {PV[]}
 */
const parse_locations = (data) => {
	return data.split("\n").map(line => {
		const re = /^<x=(\-?\d+), y=(\-?\d+), z=(\-?\d+)>$/;
		const matches = re.exec(line);
		const [x, y, z] = matches.slice(1).map(Number);
		return { x, y, z };
	});
};

/** @type {(keyof PV)[]} */
const KEYS = [ "x", "y", "z" ];

/**
 * @param {Moon[]} moons
 */
const update_moons = (moons) => {
	for (let i = 0; i < 3; i++) {
		const moon_u = moons[i];
		for (let j = i + 1; j < 4; j++) {
			const moon_v = moons[j];
			for (const k of KEYS) {
				const u = moon_u.location[k], v = moon_v.location[k];
				const diff = u === v
					? 0
					: u > v
					? -1
					: 1;

				moon_u.velocity[k] += diff;
				moon_v.velocity[k] -= diff;
			}
		}
	}

	for (let moon of moons) {
		for (const k of KEYS) {
			moon.location[k] += moon.velocity[k];
		}
	}
};

/**
 * @param {Moon} moon
 */
const get_energy = (moon) => {
	const [pot, kin] = [moon.location, moon.velocity].map(x => {
		return KEYS.reduce((s, k) => s + Math.abs(x[k]), 0);
	});

	return pot * kin;
};

/**
 * @param {string} data
 */
export const total_energy = (data, steps = 1000) => {
	/** @type {Moon[]} */
	const moons = parse_locations(data).map(location => ({
		location,
		velocity: { x: 0, y: 0, z: 0 },
	}));

	while (steps-- > 0) {
		update_moons(moons);
	}

	let total = 0;
	for (let i = 0; i < 4; i++) {
		total += get_energy(moons[i]);
	}

	return total;
};

/**
 * @param {Moon[]} moons
 * @param {keyof PV} axis
 * @returns {number}
 */
const cycle_length = (moons, axis) => {
	const inital = moons.map(m => [m.location[axis],  m.velocity[axis]]);

	let steps = 0;
	while (true) {
		for (let i = 0; i < 3; i++) {
			const a = moons[i];
			for (let j = i + 1; j < 4; j++) {
				const b = moons[j];
				const delta = a.location[axis] === b.location[axis]
					? 0
					: a.location[axis] > b.location[axis]
					? -1
					: 1;
				a.velocity[axis] += delta;
				b.velocity[axis] -= delta;
			}
		}

		for (let moon of moons) {
			moon.location[axis] += moon.velocity[axis];
		}

		steps++;

		if (moons.every((m, i) =>
			m.location[axis] === inital[i][0] &&
			m.velocity[axis] === inital[i][1])) {
			return steps;
		}
	}
};

/**
 * @param {string} data
 */
export const system_cycle = (data) => {
	/** @type {Moon[]} */
	const moons = parse_locations(data).map(location => ({
		location,
		velocity: { x: 0, y: 0, z: 0 },
	}));

	const periods = KEYS.map(k => cycle_length(moons, k));

	return periods.reduce(lcm);
};
