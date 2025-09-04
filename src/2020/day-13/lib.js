import { lcm } from "../../lib/math.js";

/**
 * @param {string} data
 */
export const min_waiting = (data) => {
	const [str_time, str_buses] = data.split("\n");
	const depart = +str_time;

	const re = /\d+/g;
	let match;

	let min = Number.MAX_SAFE_INTEGER, min_id = -1;

	while ((match = re.exec(str_buses))) {
		const id = +match[0];
		let k = 1;
		while (id * k < depart)
			k++

		const waiting = id * k - depart;
		if (waiting < min) {
			min = waiting;
			min_id = id;
		}
	}

	return min * min_id;
};

/**
 * @param {string} data
 */
export const earliest_timestamp = (data) => {
	const raw_buses = data.split("\n").pop().split(",");

	/** @type {[bigint, bigint][]} */
	const buses = [];
	for (let i = 0; i < raw_buses.length; i++) {
		if (raw_buses[i] === "x")
			continue;

		// buses.push([i, +raw_buses[i]].map(BigInt));
		buses.push([i, +raw_buses[i]]);
	}

	let t = 0, step = 1;

	for (const [offset, id] of buses) {
		while ((t + offset) % id !== 0) {
			t += step;
		}
		step = lcm(step, id);
	}

	return t;
};
