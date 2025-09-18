// @ts-check

import {
	all_subsets,
	zip_with_complement,
} from "../../lib/array.js";

/**
 * @typedef {import("./types").Valve} Valve
 * @typedef {import("./types").NValve} NValve Numbered Valves
 */

/**
 * @param {string} data
 * @returns {Valve[]}
 */
const parse = (data) => {
	return data.split("\n").map(line => {
		const parts = line.match(/[A-Z]{2}/g);
		// @ts-ignore
		const [ name, ...children ] = parts;
		// @ts-ignore
		const rate = +line.match(/rate=(\d+)/)[1];
		return { name, rate, children };
	});
};

/**
 * @param {number[]} valves
 */
export const partition = (valves) => {
	const left = all_subsets(valves);
	return zip_with_complement(valves, left);
};

/**
 * @param {NValve[]} valves
 */
const floyd_warshall = (valves) => {
	const N = valves.length;

	/** @type {number[][]} */
	const distances = Array.from({ length: N }, () => Array(N).fill(Number.MAX_SAFE_INTEGER));
	for (let i = 0; i < N; i++) {
		distances[i][i] = 0;
	}
	valves.forEach((valve, u) => {
		valve.children.forEach(v => distances[u][v] = 1);
	});

	for (let k = 0; k < N; k++) {
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				distances[i][j] = Math.min(
					distances[i][j],
					distances[i][k] + distances[k][j],
				);
			}
		}
	}

	return distances;
};

/**
 * @param {NValve[]} all_valves
 * @param {number[][]} distances
 * @param {Record<string, number>} cache
 * @param {number} curr_valve
 * @param {number[]} pending_valves
 * @param {number} remaining_steps
 * @returns {number}
 */
const solve = (all_valves, distances, cache, curr_valve, pending_valves, remaining_steps) => {
	const key = [
		curr_valve,
		pending_valves.join(","),
		remaining_steps,
	].join(";");
	let best = cache[key];
	if (typeof best === "number") {
		return best;
	}
	best = 0;

	for (let i = 0; i < pending_valves.length; i++) {
		const next_pending = pending_valves[i];
		const steps = distances[curr_valve][next_pending];
		const next_remaining_steps = remaining_steps - steps - 1;

		if (next_remaining_steps > 0) {
			const next_pending_valves = [
				pending_valves.slice(0, i),
				pending_valves.slice(i + 1),
			].flat();

			const next_result = solve(
				all_valves,
				distances,
				cache,
				next_pending,
				next_pending_valves,
				next_remaining_steps,
			);

			const curr_result = next_result + all_valves[next_pending].rate * next_remaining_steps;
			best = Math.max(best, curr_result);
		}
	}

	cache[key] = best;
	return best;
};

/**
 * @param {string} data
 */
export const most_pressure = (data) => {
	const raw_valves = parse(data);

	/** @type {Map<string, number>} */
	const map_id_to_num = new Map();
	/** @param {string} id */
	const check_id = (id) => {
		if (!map_id_to_num.has(id)) {
			map_id_to_num.set(id, map_id_to_num.size);
		}
	};
	check_id("AA");
	for (const valve of raw_valves) {
		check_id(valve.name);
		valve.children.forEach(check_id);
	}

	/** @type {NValve[]} */
	const valves = Array(map_id_to_num.size);
	raw_valves.forEach(v => {
		const id = map_id_to_num.get(v.name);
		// @ts-ignore
		valves[id] = {
			rate: v.rate,
			children: v.children.map(x => map_id_to_num.get(x)),
		}
	});

	const distances = floyd_warshall(valves);

	/** @type {Record<string, number>} */
	const cache = {};

	/**
	 * @type {number[]}
	 */
	// @ts-ignore
	const interesting_valves = raw_valves
		.filter(v => v.rate > 0)
		.map(v => map_id_to_num.get(v.name));
	interesting_valves.sort((a, b) => a - b);

	const t0 = performance.now();
	const part1 = solve(
		valves,
		distances,
		cache,
		0,
		interesting_valves,
		30,
	);

	const t1 = performance.now();
	let part2 = 0;
	partition(interesting_valves)
		.forEach(pairs => {
			const [left, right] = pairs.map(p => solve(
				valves,
				distances,
				cache,
				0,
				p,
				26,
			));
			part2 = Math.max(part2, left + right);
		});
	const t2 = performance.now();

	// console.log(`part1 ${(t1 - t0).toFixed(3)} ms`);
	// console.log(`part2 ${(t2 - t1).toFixed(3)} ms`);

	return [
		part1,
		part2,
	];
};
